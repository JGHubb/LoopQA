import { test } from '../../fixtures/page-object-fixtures'
import data from '../ui/test-data/testCasesData.json'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('domcontentloaded')
})

  let iteration: number = 1;
  data.forEach((keyword)=>{
    test(`Validate Test Case ${iteration++}`, {tag:"@Regression"},async ({ page, basePage, projectPage }) => {
    console.log(`\nTEST DATA = `)
    console.log(keyword)

          await test.step(`Navigate to ${keyword.NavigateTo}`, async()=>{
            await basePage.selectProject(keyword.NavigateTo)
          })
      
          await test.step(`Verify "${keyword.Card}", is in the "${keyword.Column}" column`, async()=>{
            ///test.slow()
            await projectPage.verifyCardInColumn(keyword.Card, keyword.Column)
          })

          await test.step(`Confirm tags: "${keyword.CardTags}"`, async()=>{
            await projectPage.verifyCardTags(keyword.Card,keyword.CardTags)
          })
  })
    })