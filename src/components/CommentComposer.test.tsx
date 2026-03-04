import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { seedMyGifsStarter, seedPosts } from '../data/gifs'
import { SavedGifsProvider } from '../context/SavedGifsContext'
import { ToastProvider } from '../context/ToastContext'
import { PostCard } from './PostCard'

function renderPostCard() {
  return render(
    <ToastProvider>
      <SavedGifsProvider>
        <PostCard post={seedPosts[0]} />
      </SavedGifsProvider>
    </ToastProvider>,
  )
}

function renderTwoPostCards() {
  return render(
    <ToastProvider>
      <SavedGifsProvider>
        <div>
          <PostCard post={seedPosts[0]} />
          <PostCard post={seedPosts[1]} />
        </div>
      </SavedGifsProvider>
    </ToastProvider>,
  )
}

describe('CommentComposer flow', () => {
  it('shows starter My GIFs immediately on a fresh render', async () => {
    const user = userEvent.setup()
    renderPostCard()

    await user.click(screen.getByRole('button', { name: /open gif picker/i }))
    await user.click(screen.getByRole('button', { name: /my gifs/i }))
    const dialog = screen.getByRole('dialog', { name: /choose a gif/i })

    expect(within(dialog).getByText('Standing ovation')).toBeInTheDocument()
    expect(within(dialog).getByText('Mind blown')).toBeInTheDocument()
  })

  it('keeps My GIFs consistent across unrelated posts and updates both when one is changed', async () => {
    const user = userEvent.setup()
    renderTwoPostCards()

    const openButtons = screen.getAllByRole('button', { name: /open gif picker/i })

    await user.click(openButtons[0])
    await user.click(screen.getByRole('button', { name: /my gifs/i }))
    let dialog = screen.getByRole('dialog', { name: /choose a gif/i })
    expect(within(dialog).getByText('Standing ovation')).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: `Remove ${seedMyGifsStarter[0].title} from My GIFs`,
      }),
    )
    await user.click(screen.getByRole('button', { name: /close gif picker$/i }))

    await user.click(openButtons[1])
    await user.click(screen.getByRole('button', { name: /my gifs/i }))
    dialog = screen.getByRole('dialog', { name: /choose a gif/i })

    expect(within(dialog).queryByText('Standing ovation')).not.toBeInTheDocument()
    expect(within(dialog).getByText('Mind blown')).toBeInTheDocument()
  })

  it('selects a GIF, shows the preview, and posts a new comment', async () => {
    const user = userEvent.setup()
    renderPostCard()

    await user.click(screen.getByRole('button', { name: /open gif picker/i }))
    expect(screen.getByRole('dialog', { name: /choose a gif/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /standing ovation/i }))

    expect(screen.getByText(/selected gif/i)).toBeInTheDocument()
    expect(screen.getAllByText('Standing ovation')).toHaveLength(2)

    await user.type(
      screen.getByRole('textbox', { name: /write a comment/i }),
      'Looping this into the thread.',
    )
    await user.click(screen.getByRole('button', { name: /^post$/i }))

    expect(screen.getByText('Looping this into the thread.')).toBeInTheDocument()
    expect(screen.getByText('You')).toBeInTheDocument()
  })

  it('closes the GIF picker sheet from the close button', async () => {
    const user = userEvent.setup()
    renderPostCard()

    await user.click(screen.getByRole('button', { name: /open gif picker/i }))
    expect(screen.getByRole('dialog', { name: /choose a gif/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /close gif picker$/i }))

    expect(screen.queryByRole('dialog', { name: /choose a gif/i })).not.toBeInTheDocument()
  })
})
