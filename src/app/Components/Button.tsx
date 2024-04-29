import { ButtonProps } from '../../Utils/types'

export const Button = ({ title, bgColor, color, functionToPlay }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${color}`}
      onClick={functionToPlay}
    >
      {title}
    </button>
  )
}