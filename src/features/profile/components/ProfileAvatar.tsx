interface ProfileAvatarProps {
    initial: string
  }
  
  export default function ProfileAvatar({ initial }: ProfileAvatarProps) {
    return (
      <div className="w-16 h-16 rounded-full bg-[#1f2937] flex items-center justify-center text-2xl font-semibold text-[#FE7E32]">
        {initial}
      </div>
    )
  }