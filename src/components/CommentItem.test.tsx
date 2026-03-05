import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { seedPosts } from '../data/gifs'
import { SavedGifsProvider } from '../context/SavedGifsContext'
import { ToastProvider } from '../context/ToastContext'
import { useToast } from '../context/useToast'
import { PostCard } from './PostCard'
import { Toast } from './Toast'

function PostCardWithToast() {
  const { dismissToast, toast } = useToast()

  return (
    <>
      <PostCard post={seedPosts[0]} />
      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  )
}

function renderPostCard() {
  return render(
    <ToastProvider>
      <SavedGifsProvider>
        <PostCardWithToast />
      </SavedGifsProvider>
    </ToastProvider>,
  )
}

describe('CommentItem save discoverability', () => {
  it('shows a visible save/remove button on GIF comments without opening the menu', () => {
    renderPostCard()

    expect(
      screen.getByRole('button', { name: /remove mind blown from my gifs/i }),
    ).toBeInTheDocument()
  })

  it('toggles saved state from the visible button and shows toasts', async () => {
    const user = userEvent.setup()
    renderPostCard()

    await user.click(
      screen.getByRole('button', { name: /remove mind blown from my gifs/i }),
    )
    expect(await screen.findByText('Removed from My GIFs')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /save mind blown to my gifs/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /save mind blown to my gifs/i }))
    expect(
      await screen.findByText(/saved to my gifs|library full, removed oldest gif/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /remove mind blown from my gifs/i }),
    ).toBeInTheDocument()
  })
})
