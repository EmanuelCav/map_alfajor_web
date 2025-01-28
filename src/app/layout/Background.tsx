import { BackgroundPropsType } from "../types/props.types"

const Background = ({ children, zIndex }: BackgroundPropsType) => {
    return (
        <div className={`absolute ${zIndex} top-0 left-0 w-full h-screen flex justify-center items-center p-4`} 
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="relative bg-white w-full h-full sm:h-3/4 max-w-xl bg-white border border-gray-200 border-solid rounded-lg shadow p-6">
                {children}
            </div>
        </div>
    )
}

export default Background