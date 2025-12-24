import Header from "@/components/header"

export default function PageLayout({children}: {
    children: React.ReactNode
}) {

    return(
        <div>
            {children}
            <footer>Footer</footer>
        </div>
    )

}