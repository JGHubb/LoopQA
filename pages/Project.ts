import { expect, type Locator, type Page } from "@playwright/test";

export class ProjectPage {
    readonly page: Page
    readonly projects: Locator
    readonly tables: Locator
    readonly tableNames: Locator
    readonly cardNames: Locator
    readonly tagsInEachCard: Locator
    
    constructor(page: Page) {
      this.page = page
      this.projects = page.locator('div.SidebarProjectsSectionProjectList-projects span')
      this.tables = page.locator(`div.CommentOnlyBoardBody-columnList div.CommentOnlyBoardColumn`)
      this.tableNames = page.locator(`div.CommentOnlyBoardBody-columnList div.CommentOnlyBoardColumn h3`)
      this.cardNames = page.locator(`div.CommentOnlyBoardBody-columnList div.CommentOnlyBoardColumn span.BoardCard-taskName`)
      this.tagsInEachCard = page.locator(`div.BoardCardLayout div.BoardCardLayout-contentAboveSubtasks div.BoardCardLayout-customPropertiesAndTags`)
    }
    
    async verifyCardInColumn(card: string, columnName: string): Promise<void> {
      await this.page.waitForTimeout(1200)
        let isBoardColumnPresent: boolean = false;
        for (let index = 0; index < (await this.tableNames.all()).length; index++) {
          let currentColumn:string = (await this.tableNames.nth(index).textContent()).trim().replace(String.fromCharCode(160), " ")
          if(currentColumn===columnName){
            console.log("ACTUAL COLUMN: " + currentColumn)
            isBoardColumnPresent = true
            let cardName: string = (await this.page.locator(`div.CommentOnlyBoardBody-columnList div.CommentOnlyBoardColumn:nth-child(${index + 1}) span.BoardCard-taskName:text("${card}")`).textContent()).trim()
            console.log("ACTUAL CARD: " + cardName)
            expect(cardName).toBe(card)
            break;
          }
        }
        if(!isBoardColumnPresent) throw new Error(`Column "${columnName}" was not detected!`);

      }

      async verifyCardTags(card: string, tags: string[]): Promise<void> {
        
        let isCardPresent: boolean = false;
        for (let index = 0; index < (await this.cardNames.all()).length; index++) {
          let currentCard:string = await this.cardNames.nth(index).textContent()
          if(currentCard.trim()===card){
            console.log("ACTUAL CARD: " + currentCard.trim())
            isCardPresent = true
            let tagsInCard: Locator = this.page.locator(`div.BoardCardLayout div.BoardCardLayout-contentAboveSubtasks div.BoardCardLayout-customPropertiesAndTags`).nth(index)
            let random:string[]= ((await tagsInCard.allInnerTexts()).at(0)).split('\n')
            console.log("ACTUAL TAGS PRESENT: [" + random + "]")
            tags.forEach(tag=>expect(random.includes(tag)).toBeTruthy())
            break;
          }
        }
        if(!isCardPresent) throw new Error(`Card "${card}" was not detected! Therefore cannot read any tags belomging to the card.`);
      }

    }