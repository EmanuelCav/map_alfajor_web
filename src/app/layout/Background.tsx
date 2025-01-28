import { ReactNode } from "react"

const Background = ({ children }: { children: ReactNode }) => {
    return (
        <div className="absolute z-10 top-0 left-0 w-full h-screen flex justify-center items-center p-4" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="relative bg-white w-full h-3/4 max-w-xl bg-white border border-gray-200 border-solid rounded-lg shadow p-6">
                {children}
            </div>
        </div>
    )
}

export default Background