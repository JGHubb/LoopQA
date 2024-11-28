import { expect, type Locator, type Page } from "@playwright/test";

export class BasePage {
    readonly page: Page
    readonly userSettingsBtn: Locator
    readonly logOutButton: Locator
    readonly projects: Locator
    
    constructor(page: Page) {
      this.page = page
      this.userSettingsBtn = page.locator('div[aria-label="User settings"]:visible')
      this.logOutButton = page.locator('div[role="menuitem"]:visible').last()
      this.projects = page.locator('div.SidebarProjectsSectionProjectList-projects span')
    }
    
    async clickLogOutButton(): Promise<void> {
      await this.logOutButton.click()
      }

    async clickUserSettingsButton(): Promise<void> {
      await this.userSettingsBtn.click()
      }
  
      async selectProject(projectName: string): Promise<void> {
      await this.page.locator(`div.SidebarProjectsSectionProjectList-projects span:text("${projectName}")`).click()
      await expect(this.page.locator(`h1.TypographyPresentation`)).toHaveText(projectName, {timeout:10000})
      await this.page.waitForLoadState('domcontentloaded')
      }

    async signOut(title: string, baseURL: string|undefined): Promise<void> {
      this.clickUserSettingsButton()
      this.clickLogOutButton()
      await expect(this.page).toHaveTitle(title, {timeout:10000})
      await expect(this.page).toHaveURL(baseURL+'/-/login', {timeout:12000})
      }
    
    }