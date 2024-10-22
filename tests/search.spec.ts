//test the search specs

import { test, expect } from "@playwright/test";

test("go to search page", async ({ page }) => {
  //go to  home page

  await page.goto("/");

  //click search button

  await page.getByRole("button", { name: "Search" }).click();

  //now assert

  await expect(
    page.getByRole("heading", {
      name: "Filter by:",
    })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "Property Rating",
    })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "Hotel Type",
    })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "Facilities",
    })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "Max Price",
    })
  ).toBeVisible();
});

test("should display 0 hotels found when a location does not have any hotel", async ({
  page,
}) => {
  //go to  home page

  await page.goto("/");

  //click search button

  await page.getByRole("button", { name: "Search" }).click();

  //fill an unavialbale location

  const location = "Vaunatu";

  await page.locator("[name=destination]").fill(location);

  //click on search button

  await page.getByRole("button", { name: "Search" }).click();

  //now assert

  await expect(page.getByText(`0 hotels found in ${location}`)).toBeVisible();
});
