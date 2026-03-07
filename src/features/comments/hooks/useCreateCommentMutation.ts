import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppServices } from '../../../app/AppServicesContext'
import { queryKeys } from '../../../app/queryKeys'
import type { FeedData } from '../../../types'
import { createPostedComment } from '../lib/commentDrafts'

export function useCreateCommentMutation() {
  const { commentsRepository } = useAppServices()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: { postId: string; draft: import('../../../types').CommentDraft }) =>
      commentsRepository.createComment(input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.feed })
      const previousFeed = queryClient.getQueryData<FeedData>(queryKeys.feed)

      queryClient.setQueryData<FeedData>(queryKeys.feed, (current) => {
        if (!current) {
          return current
        }

        return {
          ...current,
          posts: current.posts.map((post) =>
            post.id === input.postId
              ? {
                  ...post,
                  comments: [...post.comments, createPostedComment(input.draft)],
                }
              : post,
          ),
        }
      })

      return { previousFeed }
    },
    onError: (_error, _input, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(queryKeys.feed, context.previousFeed)
      }
    },
    onSuccess: (updatedPost) => {
      queryClient.setQueryData<FeedData>(queryKeys.feed, (current) => {
        if (!current) {
          return current
        }

        return {
          ...current,
          posts: current.posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post,
          ),
        }
      })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.feed })
    },
  })
}
