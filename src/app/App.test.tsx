import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { server } from '../mocks/api/server'
import { renderWithProviders } from '../test/renderApp'

async function openFirstPicker() {
  const user = userEvent.setup()
  renderWithProviders(<App />)
  const openButtons = await screen.findAllByRole('button', {
    name: /open gif picker/i,
  })

  await user.click(openButtons[0])
  const dialog = await screen.findByRole('dialog', { name: /choose a gif/i })

  return { user, dialog, openButton: openButtons[0] }
}

function getMyGifsTab(dialog: HTMLElement) {
  return within(dialog).getAllByRole('button', { name: /^my gifs$/i })[0]
}

function getMyGifsCollectionChip(dialog: HTMLElement) {
  return within(dialog).getAllByRole('button', { name: /^my gifs$/i })[1]
}

describe('App flows', () => {
  it('supports picker focus management and keyboard navigation', async () => {
    const { user, dialog, openButton } = await openFirstPicker()
    const closeButton = within(dialog).getByRole('button', {
      name: /close gif picker$/i,
    })

    expect(within(dialog).getByRole('textbox', { name: /search gifs/i })).toHaveFocus()

    closeButton.focus()
    await user.keyboard('{Shift>}{Tab}{/Shift}')
    expect(
      within(dialog).getByRole('button', {
        name: /save approved stamp to selected folder/i,
      }),
    ).toHaveFocus()

    const firstTile = within(dialog).getByAltText('Standing ovation').closest('button')
    const nextTile = within(dialog).getAllByAltText('Mind blown')[0].closest('button')

    expect(firstTile).not.toBeNull()
    expect(nextTile).not.toBeNull()

    firstTile!.focus()
    await user.keyboard('{ArrowRight}')
    expect(nextTile!).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: /choose a gif/i })).not.toBeInTheDocument()
    expect(openButton).toHaveFocus()
  })

  it('creates a folder, saves into it, and keeps the folder library available across posts', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)
    const openButtons = await screen.findAllByRole('button', {
      name: /open gif picker/i,
    })

    await user.click(openButtons[0])
    let dialog = await screen.findByRole('dialog', { name: /choose a gif/i })

    await user.click(within(dialog).getByRole('button', { name: /new folder/i }))
    await user.type(within(dialog).getByRole('textbox', { name: /folder name/i }), 'Replies')
    await user.click(within(dialog).getByRole('button', { name: /^create$/i }))
    expect(await screen.findByText('Created Replies')).toBeInTheDocument()

    await user.click(
      within(dialog).getByRole('button', {
        name: /save shocked reaction to selected folder/i,
      }),
    )
    expect(await screen.findByText('Saved to folder')).toBeInTheDocument()

    await user.click(getMyGifsTab(dialog))
    expect(within(dialog).getByText('Shocked reaction')).toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: /close gif picker$/i }))
    await user.click(openButtons[1])
    dialog = await screen.findByRole('dialog', { name: /choose a gif/i })

    await user.click(getMyGifsTab(dialog))
    expect(within(dialog).getByRole('button', { name: /^replies$/i })).toBeInTheDocument()
    expect(within(dialog).getByText('Shocked reaction')).toBeInTheDocument()
  })

  it('moves a saved gif between folders', async () => {
    const { user, dialog } = await openFirstPicker()

    await user.click(within(dialog).getByRole('button', { name: /new folder/i }))
    await user.type(within(dialog).getByRole('textbox', { name: /folder name/i }), 'Reaction Kit')
    await user.click(within(dialog).getByRole('button', { name: /^create$/i }))
    await user.click(getMyGifsTab(dialog))
    await user.click(getMyGifsCollectionChip(dialog))
    const moveSelect = within(dialog).getByRole('combobox', {
      name: /move standing ovation to folder/i,
    }) as HTMLSelectElement
    const reactionKitValue =
      Array.from(moveSelect.options).find((option) => option.text === 'Reaction Kit')
        ?.value ?? ''
    expect(reactionKitValue).toBeTruthy()

    await user.selectOptions(
      moveSelect,
      reactionKitValue,
    )

    await user.click(within(dialog).getByRole('button', { name: /^reaction kit$/i }))
    expect(within(dialog).getByText('Standing ovation')).toBeInTheDocument()
  })

  it('posts a comment with a gif attachment', async () => {
    const { user, dialog } = await openFirstPicker()

    await user.click(within(dialog).getByAltText('Standing ovation'))
    await user.click(within(dialog).getByRole('button', { name: /close gif picker$/i }))
    const composer = screen.getAllByRole('textbox', { name: /write a comment/i })[0]
    await user.type(
      composer,
      'Looping this into the thread.',
    )
    expect(composer).toHaveValue('Looping this into the thread.')
    await user.click(screen.getAllByRole('button', { name: /^post$/i })[0])

    expect(await screen.findByText('Comment posted')).toBeInTheDocument()
    expect(screen.queryByRole('dialog', { name: /choose a gif/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /view all 5 comments/i })).toBeInTheDocument()
    expect(composer).toHaveValue('')
  })

  it('rolls back optimistic saves and surfaces errors when a save fails', async () => {
    server.use(
      http.post('/api/library/save', () =>
        HttpResponse.json({ message: 'Nope' }, { status: 500 }),
      ),
    )

    const user = userEvent.setup()
    renderWithProviders(<App />, { mode: 'api' })
    const openButtons = await screen.findAllByRole('button', {
      name: /open gif picker/i,
    })
    await user.click(openButtons[0])
    const dialog = await screen.findByRole('dialog', { name: /choose a gif/i })

    await user.click(
      within(dialog).getByRole('button', {
        name: /save shocked reaction to selected folder/i,
      }),
    )

    expect(await screen.findByText('Could not update that folder')).toBeInTheDocument()

    await waitFor(() => {
      expect(
        within(dialog).getByRole('button', {
          name: /save shocked reaction to selected folder/i,
        }),
      ).toBeInTheDocument()
    })
  })
})
