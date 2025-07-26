import type { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  user: User;
  className?: string;
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <div className="relative shrink-0">
      <Avatar className={cn('border-2 border-background', className)}>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      {user.online && (
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
      )}
    </div>
  );
}
