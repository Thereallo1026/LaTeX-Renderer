import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BadgeProps {
  name: string;
  avatarUrl: string;
  redirectUrl: string;
}

export default function NameBadge({ name, avatarUrl, redirectUrl }: BadgeProps) {
  return (
    <a href={redirectUrl} rel="origin">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-35 px-2.5 py-1 transition ease-in-out">
        <Avatar className="h-5 w-5">
          <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-white">{name}</span>
      </div>
    </a>
  )
}