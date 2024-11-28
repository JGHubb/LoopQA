
# LoopQA Technical Evaluation

Hi! Thank you for taking the time to check out my LoopQA technical evaluation! I know your'e busy so lets get to it:

Please run 'npm i' command after cloning this repo to get the necessary dependencies



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file(should be created in the root) and set them equal to the correct value(unless you want to provide the value through the terminal): 

`EMAIL`

`PASSWORD`

Valid EMAIL & PASSWORD are needed so we can sign into https://app.asana.com/-/login .
## Running Tests

The project is currently configured to work with "chromium", "firefox", and "webkit", these configs can be found in playwright.config.ts :


```bash
  npx playwright test
  npx playwright test --project=webkit
  npx playwright test --project=chromium
  npx playwright test --project=firefox
```
with gitbash if you want to set .env variables in terminal
```bash
PASSWORD=yourPass EMAIL=yourEmail npx playwright test --project=webkit
PASSWORD=yourPass EMAIL=yourEmail npx playwright test --project=chromium
PASSWORD=yourPass EMAIL=yourEmail npx playwright test --project=firefox
```
#   L o o p Q A  
 