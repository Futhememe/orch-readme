import { ReactNode } from 'react'

interface IFloatingButton {
  title: string
  icon: ReactNode
  onClick?: () => void
}

export const FloatingButton = ({ icon, title, onClick }: IFloatingButton): JSX.Element => {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 cursor-pointer w-full hover:bg-grey-600/70 delay-75"
      onClick={() => onClick?.()}
    >
      <div className="flex h-5 w-5 rounded-md items-center justify-center text-blackfont-500 ">
        {icon}
      </div>

      <div className="flex flex-col justify-center gap-1">
        <p className="font-[501] text-blackfont-500 text-sm">{title}</p>
      </div>
    </div>
  )
}
