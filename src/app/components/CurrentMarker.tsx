import BackgroundBottom from "../layout/BackgroundBottom"

import { CurrentMarkerPropsType } from "../types/props.types"

const CurrentMarker = ({ acceptAlfajor, addAlfajor }: CurrentMarkerPropsType) => {
    return (
        <BackgroundBottom>
            <p className="text-xl md:text-3xl text-amber-600 font-bold text-center my-2">Negocio Localizado</p>
            <button
                onClick={addAlfajor}
                className="p-3 cursor-pointer text-white text-lg md:text-xl font-semibold w-full md:w-2/3 bg-amber-500 hover:bg-amber-600 active:bg-amber-500 my-2">
                🍪 Agregar Alfajores 🍪
            </button>
            <button
                onClick={acceptAlfajor}
                className="p-4 cursor-pointer text-white text-lg md:text-xl font-semibold w-full md:w-2/3 bg-amber-500 hover:bg-amber-600 active:bg-amber-500 my-2">
                Regresar
            </button>
        </BackgroundBottom>
    )
}

export default CurrentMarker