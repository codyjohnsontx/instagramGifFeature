import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { seedPosts } from '../data/gifs'
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

describe('CommentComposer flow', () => {
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
