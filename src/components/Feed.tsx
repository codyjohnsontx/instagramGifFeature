import type { PostItem } from '../types'
import { PostCard } from './PostCard'

type FeedProps = {
  posts: PostItem[]
}

export function Feed({ posts }: FeedProps) {
  return (
    <div className="mx-auto grid gap-4 sm:gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
