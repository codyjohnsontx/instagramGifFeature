import type { StoryItem } from '../types'

type StoriesBarProps = {
  items: StoryItem[]
}

export function StoriesBar({ items }: StoriesBarProps) {
  return (
    <div className="mb-5 border-b border-[#262626] pb-4 lg:mb-8">
      <div className="subtle-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-0">
        {items.map((item) => (
          <button
            key={item.id}
            className="group flex w-18 shrink-0 flex-col items-center gap-2 text-center"
            type="button"
          >
            <div
              className={`rounded-full p-[3px] ${
                item.seen
                  ? 'bg-[linear-gradient(135deg,#22c55e,#10b981)]'
                  : 'bg-[linear-gradient(135deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)]'
              }`}
            >
              <div className="rounded-full bg-black p-[2px]">
                <img
                  alt={item.name}
                  className="h-16 w-16 rounded-full object-cover"
                  src={item.avatarUrl}
                />
              </div>
            </div>
            <span className="w-full truncate text-xs text-[#f5f5f5]">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
