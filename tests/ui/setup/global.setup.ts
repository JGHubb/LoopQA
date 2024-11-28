import {test as setup} from '@playwright/test'
import { Login } from '../../../pages/Login'

setup('Login - Set Auth State', async ({page}, workers) => {
 console.log(`BEGIN SETUP - ${workers.project.name}`)
  await page.goto('/-/login');
  const loginPage = new Login(page)
  await loginPage.signIn()
  await page.context().storageState({ path: `./saved-auths/${workers.project.name}.json` })
  console.log(`THE STATE IS SAVED! - ${workers.project.name}`)  
})