export default function LabelItem(props : any){
    return(
        <label {...props} className={`flex flex-col ${props.className}`}> 
            {props.children}
        </label>
    )
}