export default function ErrorForm({error} : any ){
    return (
        error && <p className="my-1 text-red-500">{
        String(error.message)}</p>
        )
}