import { test } from '../../fixtures/page-object-fixtures'

test('Validate Login', {tag:`@Smoke`}, async ({ page, loginPage }) => {
 
  await test.step(`Navigate to URL`, async()=>{
    await page.goto('/-/login')
  })

  await test.step(`Input Email`, async()=>{
    await loginPage.enterEmail()
  })

  await test.step(`Cick "Continue"`, async()=>{
    await loginPage.clickContinueButton()
  })
  await test.step(`Input Password`, async()=>{
    await loginPage.enterPassword()
  })
  await test.step(`Cick "Login"`, async()=>{
    await loginPage.clickLoginButton()
  })

  await test.step(`Validate Succesful login`, async()=>{
    await loginPage.validateSuccesfulLogin()
  })

});
