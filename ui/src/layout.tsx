import { Navbar } from "./components/navbar"

type LayoutProps = {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
