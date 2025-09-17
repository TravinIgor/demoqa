import { expect } from 'playwright/test'
import { test } from '../fixtures/fixture'

test('Demo QA', async ({ demo }) => {
  const { 
    firstNameInput, LastNameInput, emailInput, mobileNumberInput, date,
    addressInput, state, city, submitButton, studentName, studentEmail,
    gender, mobilePhone, dateOfBirth, address, stateAndCity, subjects
   } = demo

  const formData = {
    firstName: 'Vasya',
    lastName: 'Petrov',
    email: 'vasyapetrov@email.com',
    mobilePhone: '1234567890',
    date: {
      day: '15',
      month: 'May',
      year: '2020'
    },
    address: 'Moscow',
    state: 'Haryana',
    city: 'Panipat',
    gender: {
      male: 'Male',
      female: 'Female',
      other: 'Other'
    },
    subjects: ['Computer Science', 'English', 'Biology']
  }

  await test.step('Field validation', async step => {
    step.skip(true, 'will add on demand')
  })

  await test.step('Fill and submit form', async () =>{
    await demo.page.pause()
    await firstNameInput.fill(formData.firstName)
    await LastNameInput.fill(formData.lastName)
    await emailInput.fill(formData.email)
    await date.fill(`${formData.date.day} ${formData.date.month} ${formData.date.year}`)
    await demo.selectGender(formData.gender.male)
    await mobileNumberInput.fill(formData.mobilePhone)
    await addressInput.fill(formData.address)
    await demo.selectStateOrCity(state ,formData.state)
    await demo.selectStateOrCity(city, formData.city)
    await demo.addSubject(formData.subjects)

    await submitButton.click()
  })

  await test.step('Check values', async () => {
    await expect(studentName).toHaveText(`${formData.firstName} ${formData.lastName}`)
    await expect(studentEmail).toHaveText(formData.email)
    await expect(gender).toHaveText(formData.gender.male)
    await expect(mobilePhone).toHaveText(formData.mobilePhone)
    await expect(dateOfBirth).toHaveText(`${formData.date.day} ${formData.date.month},${formData.date.year}`)
    await expect(address).toHaveText(formData.address)
    await expect(stateAndCity).toHaveText(`${formData.state} ${formData.city}`)
    await expect(subjects).toHaveText(formData.subjects.join(', '))
  })
})
