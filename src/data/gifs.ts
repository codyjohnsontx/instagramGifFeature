import type { GifItem, PostItem } from '../types'

export const seedGifCatalog: GifItem[] = [
  {
    id: 'applause',
    title: 'Standing ovation',
    url: 'https://media.giphy.com/media/3orieTfp1MeFLiBQR2/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/3orieTfp1MeFLiBQR2/200w.gif',
    source: 'Giphy',
  },
  {
    id: 'mind-blown',
    title: 'Mind blown',
    url: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/200w.gif',
    source: 'Giphy',
  },
  {
    id: 'happy-dance',
    title: 'Happy dance',
    url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/111ebonMs90YLu/200w.gif',
    source: 'Giphy',
  },
  {
    id: 'thumbs-up',
    title: 'Big thumbs up',
    url: 'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/5GoVLqeAOo6PK/200w.gif',
    source: 'Giphy',
  },
  {
    id: 'chef-kiss',
    title: 'Chef kiss',
    url: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/200w.gif',
    source: 'Giphy',
  },
  {
    id: 'shocked',
    title: 'Shocked reaction',
    url: 'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/200w.gif',
    source: 'Giphy',
  },
  {
    id: 'slow-clap',
    title: 'Slow clap',
    url: 'https://media.giphy.com/media/nbvFVPiEiJH6JOGIok/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/nbvFVPiEiJH6JOGIok/200w.gif',
    source: 'Giphy',
  },
  {
    id: 'laughing',
    title: 'Laughing hard',
    url: 'https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/10JhviFuU2gWD6/200w.gif',
    source: 'Giphy',
  },
  {
    id: 'wave',
    title: 'Friendly wave',
    url: 'https://media.giphy.com/media/l46CkATpdyLwLI7vi/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/l46CkATpdyLwLI7vi/200w.gif',
    source: 'Giphy',
  },
  {
    id: 'heart-eyes',
    title: 'Heart eyes',
    url: 'https://media.giphy.com/media/3o6ZsY8dT8jvN9ABEs/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/3o6ZsY8dT8jvN9ABEs/200w.gif',
    source: 'Giphy',
  },
  {
    id: 'this',
    title: 'This is the one',
    url: 'https://media.giphy.com/media/LwIyvaNcnzsD6/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/LwIyvaNcnzsD6/200w.gif',
    source: 'Giphy',
  },
  {
    id: 'party',
    title: 'Party confetti',
    url: 'https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/200w.gif',
    source: 'Giphy',
  },
  {
    id: 'wow',
    title: 'Wow reaction',
    url: 'https://media.giphy.com/media/udmx3pgdiD7tm/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/udmx3pgdiD7tm/200w.gif',
    source: 'Giphy',
  },
  {
    id: 'approved',
    title: 'Approved stamp',
    url: 'https://media.giphy.com/media/26gssIytJvy1b1THO/giphy.gif',
    previewUrl: 'https://media.giphy.com/media/26gssIytJvy1b1THO/200w.gif',
    source: 'Giphy',
  },
]

const [
  applause,
  mindBlown,
  happyDance,
  thumbsUp,
  chefKiss,
  shocked,
  slowClap,
  laughing,
  wave,
  heartEyes,
  thisOne,
  party,
  wow,
  approved,
] = seedGifCatalog

export const seedPosts: PostItem[] = [
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
        type: 'text',
        text: 'The layered textures are perfect.',
      },
      {
        id: 'fern-comment-2',
        author: 'Milo',
        createdAt: '14m',
        type: 'gif',
        text: 'Exactly how I felt seeing the final shelf styling.',
        gif: mindBlown,
      },
      {
        id: 'fern-comment-3',
        author: 'Sage',
        createdAt: '11m',
        type: 'text',
        text: 'Need the plant list when you have it.',
      },
      {
        id: 'fern-comment-4',
        author: 'Ari',
        createdAt: '8m',
        type: 'gif',
        gif: chefKiss,
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
        type: 'gif',
        text: 'Me showing up right on time.',
        gif: applause,
      },
      {
        id: 'supper-comment-2',
        author: 'Rae',
        createdAt: '18m',
        type: 'text',
        text: 'The plating makes this feel like a restaurant preview.',
      },
      {
        id: 'supper-comment-3',
        author: 'Cam',
        createdAt: '16m',
        type: 'gif',
        gif: thumbsUp,
      },
      {
        id: 'supper-comment-4',
        author: 'Lena',
        createdAt: '9m',
        type: 'text',
        text: 'Please say the sauce recipe is coming next.',
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
        type: 'text',
        text: 'The hierarchy is really working here.',
      },
      {
        id: 'studio-comment-2',
        author: 'Ivy',
        createdAt: '20m',
        type: 'gif',
        text: 'Shipping day energy.',
        gif: party,
      },
      {
        id: 'studio-comment-3',
        author: 'Noa',
        createdAt: '12m',
        type: 'gif',
        gif: thisOne,
      },
      {
        id: 'studio-comment-4',
        author: 'Parker',
        createdAt: '7m',
        type: 'text',
        text: 'Can already picture this pattern in comments and DMs.',
      },
    ],
  },
]

export const overflowGifFixtures: GifItem[] = [
  slowClap,
  laughing,
  wave,
  heartEyes,
  wow,
  approved,
  happyDance,
  shocked,
]
