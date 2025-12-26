type ButtonProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>


const variants :  Record<string, string> = {
    default: 'bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-700 dark:hover:bg-gray-200',
    outline: 'border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500',
    ghost: 'rounded-md bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-500'
  }

const sizes: Record<string, string> = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-3 text-lg',
}

export default function Button({ variant = 'default',
    size = 'medium',
    className = '',
    ...props
    }: ButtonProps) {

    return (
          <button {...props} className={`${variant ? variants[variant] : variants['default']} ${size ? sizes[size] : sizes['base']} ${className}`}></button>

    )
}