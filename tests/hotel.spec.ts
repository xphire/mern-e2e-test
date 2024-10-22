//test the hotel specs

import { test, expect } from '@playwright/test';

import { faker } from '@faker-js/faker';


test('should allow hotel to be added to users list of hotel', async({page}) => {

    //go to page

    await page.goto('add-hotel')

     //check heading to see that we are on add-hotel page

     await expect(page.getByRole('heading', {
        name : 'Add hotel'
    })).toBeVisible()

    //fill details

    await page.locator('[name=name]').fill(faker.company.name())

    await page.locator('[name=city]').fill(faker.location.city())

    await page.locator('[name=country]').fill(faker.location.country())

    await page.locator('[name=description]').fill(faker.lorem.paragraphs(faker.number.int({min : 4 , max : 10 , multipleOf : 1})))

    await page.locator('[name=pricePerNight]').fill(faker.commerce.price({min : 100, max : 300, dec : 0}))

    await page.locator('[name=starRating]').selectOption(faker.number.int({min : 1 , max : 5 , multipleOf : 1}).toString())

    await page.locator('[id=Family]').dispatchEvent('click')

    await page.locator('[name=facilities]').first().check()

    await page.locator('[name=adultCount]').fill(faker.number.int({min : 1 , max : 10 , multipleOf : 1}).toString())

    await page.locator('[name=childCount]').fill(faker.number.int({min : 0 , max : 5 , multipleOf : 1}).toString())

    await page.locator('input[name=imageFiles]').click()

    await page.locator('input[name="imageFiles"]').setInputFiles([

        './e2e-tests/images/image1.jpg',
        './e2e-tests/images/image2.jpg',

    ]);

    await page.getByRole('button', {name : 'Save'}).click()


    ///assertions

    await expect(page.getByRole('button',{name : 'Saving...'})).toBeVisible()

    await expect(page.getByText('Hotel Saved')).toBeVisible()






})

test('should allow hotel to be edited', async ({page}) => {


    //hotels should exist in test DB already

     //go to page

     await page.goto('/my-hotels')

     await expect(page.getByRole('link',{name : 'View Details'}).first()).toBeVisible()

     await page.getByRole('link', {name : 'View Details'}).first().click()


     //now on edit hotel page

     await expect(page.getByRole('heading', {
        name : 'Edit hotel'
    })).toBeVisible()

    await expect(page.getByRole('button', {name : 'Save'})).toBeVisible()

    //now change hotel name

    const newName = faker.company.name()

    await page.locator('[name=name]').fill(newName)

    //now click on submit button

    await page.getByRole('button', {name : 'Save'}).click()

    await expect(page.getByRole('button',{name : 'Saving...'})).toBeVisible()

    await expect(page.getByText('Hotel Updated')).toBeVisible()

})

