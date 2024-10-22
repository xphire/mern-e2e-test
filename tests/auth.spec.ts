//test the registration and sign-in specs

import { test, expect } from '@playwright/test';

import { faker } from '@faker-js/faker';

const firstName = faker.person.firstName()

const lastName = faker.person.lastName()

const password = 'abcd1234F#'

const email = faker.internet.email({firstName: firstName, lastName: lastName})

test('should allow user registration and re-direction to home page', async({page}) => {

    //go to page

    await page.goto('/register')

    if(await page.getByRole('button', {name : 'Sign Out'}).isVisible()){

        //then sign out

        await page.getByRole('button', {name : 'Sign Out'}).click()

        //now go to register page 

        await page.goto('/register')
    }

    //check heading to see that we are on regsiter page

    await expect(page.getByRole('heading', {
        name : 'Create an Account'
    })).toBeVisible()

     //sign in button visible

     await expect(page.getByRole('link',{name : 'Sign In here'})).toBeVisible()

    //locate fields and fill them

    //firstName

    await page.locator('[name=firstName]').fill(firstName)

    //lastName

    await page.locator('[name=lastName]').fill(lastName)

    //email

    await page.locator('[name=email]').fill(email)

     //password

     await page.locator('[name=password]').fill(password)

     //confirm password

     await page.locator('[name=confirmPassword]').fill(password)

     //click on create account button

     await page.getByRole('button', {name : 'Create Account'}).click()

     //assertions

     await expect(page.getByText('Registration Success')).toBeVisible()

     await expect(page.getByRole('link',{name : 'My Bookings'})).toBeVisible()

     await expect(page.getByRole('link',{name : 'My Hotels'})).toBeVisible()

     await expect(page.getByRole('button',{name : 'Sign Out'})).toBeVisible()

     //now sign out to allow registered user sign in

     await page.getByRole('button', {name : 'Sign Out'}).click()

     
   
})

test('should allow registered user to sign-in', async({page}) => {

    await page.goto('/')

    if(await page.getByRole('button', {name : 'Sign Out'}).isVisible()){

        //then sign out

        await page.getByRole('button', {name : 'Sign Out'}).click()

        //now go to register page 

        await page.goto('/')
    }

    await expect(page.getByRole('link', {
        name : 'Sign In'
    })).toBeVisible()

    await page.getByRole('link', {name : 'Sign In'}).click()

    //check heading to see that we are on sign in page

    await expect(page.getByRole('heading', {
        name : 'Sign In'
    })).toBeVisible()

    //check login button visibility

    await expect(page.getByRole('button', {
        name : 'Login'
    })).toBeVisible()

    //check create an account here link visibility

    await expect(page.getByRole('link', {
        name : 'Create an account here'
    })).toBeVisible()

    //fill email

     await page.locator('[name=email]').fill(email)

     //fill password

     await page.locator('[name=password]').fill(password)

     //click on log in button

     await page.getByRole('button', {name : 'Login'}).click()

     await expect(page.getByText('Sign in successful')).toBeVisible()

     await expect(page.getByRole('link',{name : 'My Bookings'})).toBeVisible()

     await expect(page.getByRole('link',{name : 'My Hotels'})).toBeVisible()

     await expect(page.getByRole('button',{name : 'Sign Out'})).toBeVisible()


})



