import type { PostRecord } from '../../../types'
import { PostCard } from './PostCard'

export function Feed({ posts }: { posts: PostRecord[] }) {
  return (
    <div className="mx-auto grid gap-4 sm:gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
