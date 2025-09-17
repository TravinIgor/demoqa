import { test as base } from '@playwright/test'
import { DemoQa } from '../PoM/Demoqa'

type MyFixtures = {
  demo: DemoQa
}

export const test = base.extend<MyFixtures>({
  demo: async ({ page }, use) => {
    const demo = new DemoQa(page)
    await page.goto(demo.path)
    await use(demo)
  }
})
