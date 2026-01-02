import SideNavigation from "./components/sideNavigation"

export default function PageLayout({children}: {
    children: React.ReactNode
}) {

    return(
        <div className="grid grid-cols-4 gap-8 ">

            <aside className="">
                <SideNavigation />
            </aside>
            {children}
        </div>
    )

}