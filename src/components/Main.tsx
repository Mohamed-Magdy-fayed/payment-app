import { ReactNode } from "react"

export default function Main({ children }: { children: ReactNode }) {
    return (
        <div className="container flex flex-col items-center justify-center flex-grow">
            {children}
        </div>
    )
}
