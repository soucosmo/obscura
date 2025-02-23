import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"

type LayoutProps = {
    children: React.ReactNode | null
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar />
                <div className="overflow-x-auto min-h-[50vh] my-8">
                    {children}
                </div>
            <Footer />
        </>
    )
}
