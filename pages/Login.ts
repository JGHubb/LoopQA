import { expect, type Locator, type Page } from "@playwright/test";

export class Login {
    readonly page: Page
    readonly emailInputField: Locator
    readonly passwordInputField: Locator
    readonly continueButton: Locator
    readonly loginButton: Locator
    
    constructor(page: Page) {
      this.page = page
      this.emailInputField = page.locator('input[type="email"]')
      this.passwordInputField = page.locator('input[type="password"]')
      this.continueButton = page.locator('form.LoginEmailForm div[role="button"]:text("Continue")')
      this.loginButton = page.locator('form.LoginPasswordForm>div[role="button"]:text("Log in")')
    }
    
    async clickContinueButton(): Promise<void> {
      await this.continueButton.click()
      }
    async clickLoginButton(): Promise<void> {
      await this.loginButton.click()
      }
    async enterEmail(email: string = process.env.EMAIL!): Promise<void> {
      await this.emailInputField.fill(email)
    }
    async enterPassword( password: string = process.env.PASSWORD!): Promise<void> {
      await this.passwordInputField.fill(password)
    }

    async validateSuccesfulLogin( pageTitle: string = "Home - Asana", endPointSubstring = '/home/'): Promise<void> {
        await expect(this.page).toHaveTitle(pageTitle, {timeout:16000})
        expect(this.page.url()).toContain(endPointSubstring)  
      }
    
    async signIn( pageTitle: string = "Home - Asana", endPointSubstring = '/home/'): Promise<void> {
       await this.enterEmail()
       await this.clickContinueButton()
       await this.enterPassword()
       await this.clickLoginButton()
       await this.validateSuccesfulLogin(pageTitle,endPointSubstring)
      }
    

  }