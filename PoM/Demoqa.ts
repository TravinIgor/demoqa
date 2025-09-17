import { Locator, Page } from "playwright"

export class DemoQa {
  readonly path = 'https://demoqa.com/automation-practice-form'

  // Form locators
  readonly firstNameInput: Locator
  readonly LastNameInput: Locator
  readonly emailInput: Locator
  readonly mobileNumberInput: Locator
  readonly addressInput: Locator
  readonly state: Locator
  readonly city: Locator
  readonly date: Locator
  readonly subjectsInput: Locator
  readonly submitButton: Locator

  // Result locators
  readonly studentName: Locator
  readonly studentEmail: Locator
  readonly gender: Locator
  readonly mobilePhone: Locator
  readonly dateOfBirth: Locator
  readonly subjects: Locator
  readonly address: Locator
  readonly stateAndCity: Locator

  constructor (public readonly page: Page) {
    // Form locators
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' })
    this.LastNameInput = page.getByRole('textbox', { name: 'Last Name' })
    this.emailInput = page.getByRole('textbox', { name: 'name@example.com' })
    this.mobileNumberInput = page.getByRole('textbox', { name: 'Mobile Number' })
    this.addressInput = page.getByRole('textbox', { name: 'Current Address' })
    this.state = page.locator('#state')
    this.city = page.locator('#city')
    this.date = page.locator('#dateOfBirthInput')
    this.subjectsInput = page.locator('#subjectsInput')
    this.submitButton = page.getByRole('button', { name: 'Submit' })

    // Result locators
    this.studentName = page.getByRole('row', { name: 'Student Name' }).getByRole('cell').last()
    this.studentEmail = page.getByRole('row', { name: 'Student Email' }).getByRole('cell').last()
    this.gender = page.getByRole('row', { name: 'Gender' }).getByRole('cell').last()
    this.mobilePhone = page.getByRole('row', { name: 'Mobile' }).getByRole('cell').last()
    this.dateOfBirth = page.getByRole('row', { name: 'Date of Birth' }).getByRole('cell').last()
    this.subjects = page.getByRole('row', { name: 'Subjects' }).getByRole('cell').last()
    this.address = page.getByRole('row', { name: 'Address' }).getByRole('cell').last()
    this.stateAndCity = page.getByRole('row', { name: 'State and City' }).getByRole('cell').last()
  }

  async addSubject (subjects: Array<string>): Promise<void> {
    for (const subject of subjects) {
      await this.subjectsInput.fill(subject)
      await this.page.waitForTimeout(100) // Do not remove timeout! Not working without it!
      await this.page.keyboard.press('Enter')
    }
  }

  async selectStateOrCity (locator: Locator, stateOrCityName: string): Promise<void> {
    // Bad dropdowns, have to use click() instead of selectOption(...)
    await locator.click()
    await this.page.getByText(stateOrCityName).click()
  }

  async selectGender (genderName: string): Promise<void> {
    // getByRole('radio') not working!
    await this.page.getByText(genderName, { exact: true }).check()
  }
}