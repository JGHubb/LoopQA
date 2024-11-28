import { test as teardown } from '@playwright/test'
import { BasePage } from '../../../pages/BasePage'

teardown('Logout - Remove Auth State', async ({page, baseURL}, workers) => {
  console.log(`BEGIN TEARDOWN - ${workers.project.name}`)
  await page.goto("/")
  const basePage = new BasePage(page)
  await basePage.signOut("Asana", baseURL)
  console.log(`SIGNED OUT - ${workers.project.name}`)
})