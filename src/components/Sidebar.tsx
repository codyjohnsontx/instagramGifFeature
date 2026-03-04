import type { ReactNode } from 'react'
import {
  CameraIcon,
  CreateIcon,
  ExploreIcon,
  GridIcon,
  HeartIcon,
  HomeIcon,
  MenuIcon,
  MessagesIcon,
  ReelsIcon,
  SearchIcon,
} from './Icons'

type SidebarItemProps = {
  label: string
  active?: boolean
  icon: ReactNode
  badge?: string
}

function SidebarItem({ label, active, icon, badge }: SidebarItemProps) {
  return (
    <button
      className={`flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left text-2xl transition ${
        active ? 'bg-white/10 font-semibold text-white' : 'text-[#f5f5f5] hover:bg-white/6'
      }`}
      type="button"
    >
      <span className="relative flex h-7 w-7 items-center justify-center">
        {icon}
        {badge ? (
          <span className="absolute -right-2 -top-2 rounded-full bg-[#ff3040] px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
            {badge}
          </span>
        ) : null}
      </span>
      <span className="text-[1.05rem]">{label}</span>
    </button>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden w-[245px] shrink-0 border-r border-[#262626] px-3 py-6 lg:flex lg:flex-col">
      <div className="mb-8 flex items-center gap-3 px-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-[#f5f5f5] text-white">
          <CameraIcon className="h-5 w-5" />
        </div>
        <div className="instagram-wordmark text-white">
          Instagram
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        <SidebarItem active icon={<HomeIcon className="h-7 w-7" />} label="Home" />
        <SidebarItem icon={<ReelsIcon className="h-7 w-7" />} label="Reels" />
        <SidebarItem badge="9+" icon={<MessagesIcon className="h-7 w-7" />} label="Messages" />
        <SidebarItem icon={<SearchIcon className="h-7 w-7" />} label="Search" />
        <SidebarItem icon={<ExploreIcon className="h-7 w-7" />} label="Explore" />
        <SidebarItem icon={<HeartIcon className="h-7 w-7" />} label="Notifications" />
        <SidebarItem icon={<CreateIcon className="h-7 w-7" />} label="Create" />
        <SidebarItem
          icon={
            <img
              alt="Profile"
              className="h-7 w-7 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80"
            />
          }
          label="Profile"
        />
      </nav>

      <div className="mt-auto space-y-1">
        <SidebarItem icon={<MenuIcon className="h-7 w-7" />} label="More" />
        <SidebarItem icon={<GridIcon className="h-7 w-7" />} label="Also from Meta" />
      </div>
    </aside>
  )
}
