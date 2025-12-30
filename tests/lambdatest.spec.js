const { test, expect } = require("@playwright/test");

test.describe("Lambda Test", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL before each test
    const base = "https://www.lambdatest.com/selenium-playground";
    await page.goto(base, { timeout: 60000 });
  });

  test("Simple Form Demo - single input", async ({ page,browser }) => {
    // Click on "Simple Form Demo" link
    await page.click("text=Simple Form Demo");

    //Verify the url of the page
    let url = page.url();
    expect(url.includes("simple-form-demo")).toBeTruthy();

    //Store the message to be entered
    const message = "Welcome to Lambda Test";

    // Enter the message in the textbox
    const input = page.locator("#user-message").first();
    //await page.waitForTimeout(2000);
    await input.click();
    await input.fill(message);

    //await page.waitForTimeout(2000);
    // Click the button
    await page.click('button:has-text("Get Checked Value")');
    //await page.waitForTimeout(2000);
    // Validate the message
    const result = page.locator("#message").first();
    await expect(result).toContainText(message);
  });

  test("Drag and Drop Sliders - Default Value 15", async ({ page }) => {
    // Click on "Drag and Drop Sliders" link
    await page.click("text=Drag & Drop Sliders");

    // The "Default value 15" slider is in div#slider3 with output#rangeSuccess
    const slider3 = page.locator("#slider3");
    const rangeInput = slider3.locator('input[type="range"]');
    const rangeOutput = slider3.locator("#rangeSuccess");

    // Set the slider value to 95
    while ((await rangeInput.inputValue()) !== "95") {
      await rangeInput.press("ArrowRight");
    }

    // Wait a moment for the value to be updated
    await page.waitForTimeout(500);

    // Verify that the output element shows 95
    await expect(rangeOutput).toHaveText("95");
   
  });

  test("Input Form Submit - All Fields Filled", async ({ page }) => {
    // Step 1: Click on "Input Form Submit" link
    await page.click("text=Input Form Submit");

    //Click on Submit button to trigger validation errors
    await page.getByRole("button", { name: "Submit" }).click();

    const nameInput = page.getByRole("textbox", { name: "Name" });
    const validationMessage = await nameInput.evaluate((element) => {
      return element.validationMessage;
    });

    expect(validationMessage).toMatch(
      /^(Please fill out this field\.|Fill out this field)$/
    );
    console.log(
      '✓ Validation error message verified: "Please fill out this field."'
    );

    // Fill in Name field
    await page.getByRole("textbox", { name: "Name" }).fill("John Doe");

    //await page.waitForTimeout(1000);

    // Fill in Email field
    await page
      .getByRole("textbox", { name: "Email*" })
      .fill("johndoe@example.com");

    //await page.waitForTimeout(1000);
    // Fill in Password field
    await page.getByRole("textbox", { name: "Password*" }).fill("Password123");
    //await page.waitForTimeout(1000);
    // Fill in Company field
    await page.getByRole("textbox", { name: "Company" }).fill("Acme Corp");
    //await page.waitForTimeout(1000);

    // Fill in Website field
    await page
      .getByRole("textbox", { name: "Website" })
      .fill("www.acmecorp.com");
    //await page.waitForTimeout(1000);

    // Step 5: From the Country drop-down, select "United States" using the text property
    await page.getByRole("combobox").selectOption("United States");
    //await page.waitForTimeout(1000);
    // Fill in City field
    await page
      .getByRole("textbox", { name: "City", exact: true })
      .fill("New York");
    //await page.waitForTimeout(1000);
    // Fill in Address 1 field
    await page
      .getByRole("textbox", { name: "Address 1" })
      .fill("123 Main Street");
    //await page.waitForTimeout(1000);
    // Fill in Address 2 field
    await page.getByRole("textbox", { name: "Address 2" }).fill("Apt 101");
    //await page.waitForTimeout(1000);

    // Fill in State field
    await page.getByRole("textbox", { name: "City* State*" }).fill("NY");
    //await page.waitForTimeout(1000);
    // Fill in Zip Code field
    await page.getByRole("textbox", { name: "Zip Code*" }).fill("10001");
    //await page.waitForTimeout(1000);

    // Step 6: Click Submit button
    await page.getByRole("button", { name: "Submit" }).click();

    //await page.waitForTimeout(2000);

    // Step 7: Validate the success message
    const successMessage = page.locator(
      "text=Thanks for contacting us, we will get back to you shortly."
    );
    await expect(successMessage).toBeVisible();

    console.log("Form submitted successfully!");
    console.log(
      'Success message displayed: "Thanks for contacting us, we will get back to you shortly."'
    );
    
  });
});
