export default function InputItem(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const styles :  Record<string, string> =  {
    'checkbox': 'rounded border-gray-300 text-gray-700 bg-white dark:bg-gray-950 dark:text-gray-500 shadow-sm',
    'file': 'file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:opacity-50 file:dark:text-gray-400',
    'default': 'w-full rounded-md shadow-sm border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'
  }

  return <input {...props} className={`${styles[props.type as keyof typeof styles] ?? styles['default']} ${props.className}`} />
                          
}