export default function SelectItem(props : any){
    return (
        <select {...props} className={`border p-2 rounded-md border-gray-300 dark:border-gray-700 text-black bg-white dark:bg-gray-800 text-black dark:text-white disabled:opacity-25 ${props.className}`}>
           {props.children} 
        </select>
 
    )                            
}