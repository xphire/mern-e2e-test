import { test, expect } from '@playwright/test';

test('should be able to go to the detail page where hotel is booked', async ({page}) => {


     //go to search page

     await page.goto('/search')

     //click on first  view more button

     await page.getByRole('link', {name : 'View More'}).first().click()


     //if not signed in, you would see sign in to book

     if(await page.getByRole('button', {name : 'Sign In'}).isVisible()){

        await expect(page.getByRole('button',{name : 'Sign in to Book'})).toBeVisible()

    }

    
    if(await page.getByRole('button', {name : 'Sign Out'}).isVisible()){

        await expect(page.getByRole('button',{name : 'Book Now'})).toBeVisible()

    }

})


test('should be able to book hotel', async ({page}) => {

    //go to home page

    await page.goto('/')

    //fill check out date, add 2 or more days to check in date

    const checkInDate = await page.locator('[name=checkIn]').inputValue()

    const checkOut = () => {

        const refactor = checkInDate.split('/')

        const toFill = (parseInt(refactor[1]) + 2).toString() 

        return refactor.fill(toFill,1,2).join('/')

    }

    const date = checkOut()

    await page.locator('[name=checkOut]').clear()

    await page.locator('[name=checkOut]').fill(date)

    await page.getByRole("button", { name: "Search" }).click();

    await page.getByRole('link', {name : 'View More'}).first().click()

    await expect(page.getByRole('button',{name : 'Book Now'})).toBeVisible()

    await page.getByRole('button', {name : 'Book Now'}).first().click()

    await expect(page.getByRole('button',{name : 'Confirm Booking'})).toBeVisible()

    await page.getByRole('button', {name : 'Confirm Booking'}).click()

    //await expect(page.getByText('Booking Initiated')).toBeVisible()

    //now check for redirection to paystack

    await expect(page).toHaveURL(/.*paystack.com/)


})