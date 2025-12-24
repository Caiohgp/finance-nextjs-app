export default function InputItem(props : any){
    const styles :  Record<string, string> =  {
    'checkbox': 'rounded border-gray-300 text-gray-700 bg-white dark:bg-gray-950 dark:text-gray-500 shadow-sm',
    'default': 'w-full rounded-md shadow-sm border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'
  }

  return <input {...props} className={styles[props.type] ?? styles['default']} />
                          
}