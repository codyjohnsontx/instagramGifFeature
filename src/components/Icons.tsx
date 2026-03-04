type IconProps = {
  className?: string
  filled?: boolean
}

export function CameraIcon({ className = '' }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  )
}

export function HomeIcon({ className = '' }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3.8 3.9 10.6a1.5 1.5 0 0 0-.4 1.8 1.5 1.5 0 0 0 1.3.8h1.2V19A2 2 0 0 0 8 21h2.9v-4.8c0-.4.3-.7.7-.7h.8c.4 0 .7.3.7.7V21H16a2 2 0 0 0 2-2v-5.8h1.2a1.5 1.5 0 0 0 1.3-.8 1.5 1.5 0 0 0-.4-1.8L12 3.8Z" />
    </svg>
  )
}

export function ReelsIcon({ className = '' }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <rect
        x="3.5"
        y="4"
        width="17"
        height="16"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="m8 4 4.2 5M13.2 4l4.2 5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m10 10.2 5 2.8-5 2.8v-5.6Z" fill="currentColor" />
    </svg>
  )
}

export function MessagesIcon({ className = '' }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="m20.8 5.1-5.9 13.7-4-4-4-1 13.9-8.7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

export function SearchIcon({ className = '' }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4.5 4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

export function ExploreIcon({ className = '' }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m9.5 14.5 5.7-5.6-2 6.6-6.7 2 3-3Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

export function CreateIcon({ className = '' }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

export function MenuIcon({ className = '' }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

export function GridIcon({ className = '' }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <rect x="4" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function HeartIcon({ className = '' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12.1 20.3 5.7 13.9a4.8 4.8 0 1 1 6.8-6.8l.5.6.5-.6a4.8 4.8 0 0 1 6.8 6.8l-6.4 6.4a1.3 1.3 0 0 1-1.8 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

export function CommentBubbleIcon({ className = '' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M20 15.5a3 3 0 0 1-3 3H9l-4.5 3v-3H4a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h13a3 3 0 0 1 3 3v9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

export function PaperPlaneIcon({ className = '' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m21.5 3.5-8.3 17.3-2.8-7-7-2.8 17.3-8.3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

export function BookmarkIcon({ className = '', filled = false }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
    >
      <path
        d="M7 4.75A1.75 1.75 0 0 1 8.75 3h6.5A1.75 1.75 0 0 1 17 4.75V21l-5-3.25L7 21V4.75Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  )
}

export function SmileIcon({ className = '' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9 14c.7.8 1.8 1.3 3 1.3s2.3-.5 3-1.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
    </svg>
  )
}

export function MoreIcon({ className = '' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="6" cy="12" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="18" cy="12" r="1.7" />
    </svg>
  )
}

export function CloseIcon({ className = '' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

export function VerifiedBadgeIcon({ className = '' }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 3.5 15 5l3.4.4.4 3.4L20.5 12 18.8 15l-.4 3.4-3.4.4L12 20.5 9 18.8l-3.4-.4-.4-3.4L3.5 12 5.2 9l.4-3.4L9 5l3-1.5Z"
        fill="#0095F6"
      />
      <path
        d="m9.2 12.3 1.7 1.7 3.9-4.3"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  )
}
