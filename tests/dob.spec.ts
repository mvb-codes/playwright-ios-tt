import { expect, test } from "@playwright/test";

// Test 1: Grant geolocation permission via permission.site
test("Geolocation Permission - grant via permission.site", async ({
  page,
  context,
}) => {
  // Pre-grant with origin (handles Android Chrome — prevents OS dialog before navigation)
  await context.grantPermissions(["geolocation"], {
    origin: "https://permission.site",
  });
  await page.goto("https://permission.site/");
  await page.waitForTimeout(5000);
  await page.locator("#location").click();
  await page.waitForTimeout(5000);
  // Post-click grant (handles iOS Safari — grants after the page triggers the permission request)
  await page.context().grantPermissions(["geolocation"]);
  await page.screenshot({ path: "permission-site.png" });
});

// Test 2: Enter date of birth and submit the form
test("Date of Birth Input - enter a valid date and submit", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:5500/");
  const dobInput = page.locator('input[name="dateOfBirth"]');
  await dobInput.waitFor({ state: "visible", timeout: 15000 });

  // Set value via JS + dispatch input event (most reliable on iOS Safari where keyboard APIs don't update input value)
  await dobInput.click();
  await dobInput.focus();
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const el = document.querySelector('input[name="dateOfBirth"]') as HTMLInputElement;
    if (el) {
      el.value = "12251990";
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
  await page.waitForTimeout(500);

  // Focus and press Enter on Submit button (avoids pointer interception issues on mobile)
  const submitBtn = page.locator("button.submit-btn");
  await submitBtn.focus();
  await page.keyboard.press("Enter");

  // Verify submission success message
  await expect(page.locator(".form-card")).toContainText(
    "Submission Successful",
  );
});