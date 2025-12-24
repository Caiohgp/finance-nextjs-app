export default function TextAreaItem(props : any){
    return (
        <textarea {...props} className={`border p-2 border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 ${props.className}`}>
            {props.children}
        </textarea>
 
    )                            
}