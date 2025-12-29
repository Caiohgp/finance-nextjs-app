import { variants,sizes } from "@/lib/variants"

type ButtonProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ variant = 'default',
    size = 'medium',
    className = '',
    ...props
    }: ButtonProps) {

    return (
          <button {...props} className={`${variant ? variants[variant] : variants['default']} ${size ? sizes[size] : sizes['base']} ${className}`}></button>

    )
}