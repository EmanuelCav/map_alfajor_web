import { ReactNode } from 'react'

const BackgroundBottom = ({ children }: { children: ReactNode }) => {
    return (
        <div className="absolute z-10 top-0 left-0 w-full h-full flex justify-center items-end p-4" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="flex items-center justify-center flex-col relative bg-white w-full max-w-4xl bg-white border border-gray-200 border-solid rounded-lg shadow p-6">
                {children}
            </div>
        </div>
    )
}

export default BackgroundBottom