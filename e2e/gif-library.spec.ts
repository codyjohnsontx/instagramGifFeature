import { expect, test } from '@playwright/test'

test('creates a folder and saves a gif into it', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: /open gif picker/i }).first().click()
  const dialog = page.getByRole('dialog', { name: /choose a gif/i })

  await dialog.getByRole('button', { name: /new folder/i }).click()
  await dialog.getByRole('textbox', { name: /folder name/i }).fill('Playwright Folder')
  await dialog.getByRole('button', { name: /^create$/i }).click()
  await expect(page.getByText('Created Playwright Folder')).toBeVisible()

  await dialog
    .getByRole('button', { name: /save shocked reaction to selected folder/i })
    .click()
  await expect(page.getByText('Saved to folder')).toBeVisible()

  await dialog.getByRole('button', { name: /^my gifs$/i }).first().click()
  await expect(dialog.getByText('Shocked reaction')).toBeVisible()
})

test('surfaces an error when the save api fails', async ({ page }) => {
  await page.addInitScript(() => {
    const originalFetch = window.fetch.bind(window)

    window.fetch = async (...args) => {
      const input = args[0]
      const url =
        typeof input === 'string'
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url

      if (url.includes('/api/library/save')) {
        return new Response(JSON.stringify({ message: 'Nope' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }

      return originalFetch(...args)
    }
  })

  await page.goto('/')
  await page.getByRole('button', { name: /open gif picker/i }).first().click()
  const dialog = page.getByRole('dialog', { name: /choose a gif/i })

  await dialog
    .getByRole('button', { name: /save shocked reaction to selected folder/i })
    .click()

  await expect(page.getByText('Could not update that folder')).toBeVisible()
})
