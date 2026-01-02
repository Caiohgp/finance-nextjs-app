import { variants,sizes } from "@/lib/variants"
import Link from "next/link"

type LinkProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  href:string
} & React.LinkHTMLAttributes<HTMLAnchorElement>

export default function CustomLink({ variant = 'default',
    size = 'medium',
    className = '',
    href = '/dashboard',
    ...props
    }: LinkProps) {

    return (
          <Link {...props} href={href} className={`${variant ? variants[variant] : variants['default']} ${size ? sizes[size] : sizes['base']} ${className}`}></Link>

    )
}