import { test as base } from '@playwright/test'
import { Login } from '../pages/Login'
import { BasePage } from '../pages/BasePage'
import { ProjectPage } from '../pages/Project'

type MyFixture= {
    loginPage: Login,
    basePage: BasePage,
    projectPage: ProjectPage
}

export const test = base.extend<MyFixture>({

    loginPage: async ({ page }, use) => {
        const loginPage = new Login(page)
        await use(loginPage)
      },

      basePage: async ({page}, use) => {
        const basePage = new BasePage(page)
        await use(basePage)
      },

      projectPage: async ({page}, use) => {
        const projectPage = new ProjectPage(page)
        await use(projectPage)
      }

})

export { expect } from '@playwright/test'