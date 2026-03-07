import type {
  FeedData,
  GifAsset,
  GifCollection,
  PostRecord,
  StoryItem,
} from '../../types'

export const gifCatalog: GifAsset[] = [
  {
    id: 'applause',
    title: 'Standing ovation',
    fullUrl: 'https://media.giphy.com/media/3orieTfp1MeFLiBQR2/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/3orieTfp1MeFLiBQR2/200w.gif',
    source: 'giphy',
  },
  {
    id: 'mind-blown',
    title: 'Mind blown',
    fullUrl: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/200w.gif',
    source: 'giphy',
  },
  {
    id: 'happy-dance',
    title: 'Happy dance',
    fullUrl: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/111ebonMs90YLu/200w.gif',
    source: 'giphy',
  },
  {
    id: 'thumbs-up',
    title: 'Big thumbs up',
    fullUrl: 'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/5GoVLqeAOo6PK/200w.gif',
    source: 'giphy',
  },
  {
    id: 'chef-kiss',
    title: 'Chef kiss',
    fullUrl: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/200w.gif',
    source: 'giphy',
  },
  {
    id: 'shocked',
    title: 'Shocked reaction',
    fullUrl: 'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/200w.gif',
    source: 'giphy',
  },
  {
    id: 'slow-clap',
    title: 'Slow clap',
    fullUrl: 'https://media.giphy.com/media/nbvFVPiEiJH6JOGIok/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/nbvFVPiEiJH6JOGIok/200w.gif',
    source: 'giphy',
  },
  {
    id: 'laughing',
    title: 'Laughing hard',
    fullUrl: 'https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/10JhviFuU2gWD6/200w.gif',
    source: 'giphy',
  },
  {
    id: 'wave',
    title: 'Friendly wave',
    fullUrl: 'https://media.giphy.com/media/l46CkATpdyLwLI7vi/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/l46CkATpdyLwLI7vi/200w.gif',
    source: 'giphy',
  },
  {
    id: 'heart-eyes',
    title: 'Heart eyes',
    fullUrl: 'https://media.giphy.com/media/3o6ZsY8dT8jvN9ABEs/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/3o6ZsY8dT8jvN9ABEs/200w.gif',
    source: 'giphy',
  },
  {
    id: 'this',
    title: 'This is the one',
    fullUrl: 'https://media.giphy.com/media/LwIyvaNcnzsD6/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/LwIyvaNcnzsD6/200w.gif',
    source: 'giphy',
  },
  {
    id: 'party',
    title: 'Party confetti',
    fullUrl: 'https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/200w.gif',
    source: 'giphy',
  },
  {
    id: 'wow',
    title: 'Wow reaction',
    fullUrl: 'https://media.giphy.com/media/udmx3pgdiD7tm/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/udmx3pgdiD7tm/200w.gif',
    source: 'giphy',
  },
  {
    id: 'approved',
    title: 'Approved stamp',
    fullUrl: 'https://media.giphy.com/media/26gssIytJvy1b1THO/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/26gssIytJvy1b1THO/200w.gif',
    source: 'giphy',
  },
]

export const gifCatalogById = Object.fromEntries(
  gifCatalog.map((gif) => [gif.id, gif]),
) as Record<string, GifAsset>

function withGif(gifId: string) {
  return [{ kind: 'gif' as const, gifId }]
}

export const starterCollections: GifCollection[] = [
  {
    id: 'collection-my-gifs',
    name: 'My GIFs',
    isDefault: true,
    createdAt: '2026-03-07T00:00:00.000Z',
  },
]

export const starterSavedGifIds = [
  'applause',
  'mind-blown',
  'chef-kiss',
  'thumbs-up',
  'party',
  'this',
  'laughing',
  'heart-eyes',
]

export const overflowGifIds = [
  'slow-clap',
  'laughing',
  'wave',
  'heart-eyes',
  'wow',
  'approved',
  'happy-dance',
  'shocked',
]

export const stories: StoryItem[] = [
  {
    id: 'story-rachelle',
    name: 'rachelle_g',
    avatarUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=80',
  },
  {
    id: 'story-booboo',
    name: 'booboo_k',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80',
  },
  {
    id: 'story-tj',
    name: 'tjtuttle43',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80',
  },
  {
    id: 'story-superman',
    name: 'superman_ed',
    avatarUrl:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=320&q=80',
  },
  {
    id: 'story-alek',
    name: 'aleksalaz',
    avatarUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80',
  },
  {
    id: 'story-allison',
    name: 'allison.p',
    avatarUrl:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=320&q=80',
    seen: true,
  },
]

export const posts: PostRecord[] = [
  {
    id: 'post-fern',
    author: 'Talia Rowe',
    handle: '@taliarowe',
    location: 'Brooklyn greenhouse',
    imageUrl:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Mocking up a tiny indoor jungle corner. The late afternoon light finally cooperated.',
    comments: [
      {
        id: 'fern-comment-1',
        author: 'Nina',
        createdAt: '18m',
        text: 'The layered textures are perfect.',
        attachments: [],
      },
      {
        id: 'fern-comment-2',
        author: 'Milo',
        createdAt: '14m',
        text: 'Exactly how I felt seeing the final shelf styling.',
        attachments: withGif('mind-blown'),
      },
      {
        id: 'fern-comment-3',
        author: 'Sage',
        createdAt: '11m',
        text: 'Need the plant list when you have it.',
        attachments: [],
      },
      {
        id: 'fern-comment-4',
        author: 'Ari',
        createdAt: '8m',
        attachments: withGif('chef-kiss'),
      },
    ],
  },
  {
    id: 'post-supper',
    author: 'Evan Cole',
    handle: '@evancole',
    location: 'Home kitchen',
    imageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Testing a weeknight dinner concept that looks complicated but took less than 25 minutes.',
    comments: [
      {
        id: 'supper-comment-1',
        author: 'Jules',
        createdAt: '22m',
        text: 'Me showing up right on time.',
        attachments: withGif('applause'),
      },
      {
        id: 'supper-comment-2',
        author: 'Rae',
        createdAt: '18m',
        text: 'The plating makes this feel like a restaurant preview.',
        attachments: [],
      },
      {
        id: 'supper-comment-3',
        author: 'Cam',
        createdAt: '16m',
        attachments: withGif('thumbs-up'),
      },
      {
        id: 'supper-comment-4',
        author: 'Lena',
        createdAt: '9m',
        text: 'Please say the sauce recipe is coming next.',
        attachments: [],
      },
    ],
  },
  {
    id: 'post-studio',
    author: 'Mara Kent',
    handle: '@marakent',
    location: 'Design studio',
    imageUrl:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Pulled together a review wall for tomorrow. Tiny interactions matter more than the mock seems to admit.',
    comments: [
      {
        id: 'studio-comment-1',
        author: 'Theo',
        createdAt: '27m',
        text: 'The hierarchy is really working here.',
        attachments: [],
      },
      {
        id: 'studio-comment-2',
        author: 'Ivy',
        createdAt: '20m',
        text: 'Shipping day energy.',
        attachments: withGif('party'),
      },
      {
        id: 'studio-comment-3',
        author: 'Noa',
        createdAt: '12m',
        attachments: withGif('this'),
      },
      {
        id: 'studio-comment-4',
        author: 'Parker',
        createdAt: '7m',
        text: 'Can already picture this pattern in comments and DMs.',
        attachments: [],
      },
    ],
  },
]

export const feedData: FeedData = {
  posts,
  stories,
}

export const postMeta = {
  'post-fern': { likes: '5.6K', verified: false },
  'post-supper': { likes: '3.2K', verified: true },
  'post-studio': { likes: '8.1K', verified: true },
} as const

export function clonePosts(): PostRecord[] {
  return posts.map((post) => ({
    ...post,
    comments: post.comments.map((comment) => ({
      ...comment,
      attachments: [...comment.attachments],
    })),
  }))
}
