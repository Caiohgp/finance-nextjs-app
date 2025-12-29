
export const variants :  Record<string, string> = {
    default: 'bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-700 dark:hover:bg-gray-200 disabled:opacity-25',
    outline: 'border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-25',
    ghost: 'rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-25',
    delete: 'rounded-md bg-red-600 hover:bg-red-500 disabled:opacity-25'
  }

export const sizes: Record<string, string> = {
    tiny: 'px-2 py-0.5 text-sm',
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-3 text-lg',
}
