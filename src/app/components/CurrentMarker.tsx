import BackgroundBottom from "../layout/BackgroundBottom"

import { CurrentMarkerPropsType } from "../types/props.types"

const CurrentMarker = ({ acceptAlfajor, addAlfajor, setDetails, details, error }: CurrentMarkerPropsType) => {
    return (
        <BackgroundBottom>
            <p className="text-xl md:text-3xl text-amber-600 font-bold text-center my-2">Negocio Localizado</p>
            {
                error && <p className="text-lg text-emerald-500 text-center my-1">{error}</p>
            }
            <label htmlFor="details" className="text-left text-gray-800 text-lg mt-2">Detalles (opcional)</label>
            <textarea id="details" className="w-full md:w-2/3 my-2 p-3 rounded-lg border-orange-500 border
                        max-h-24 focus:border-orange-600 focus:ring-2 focus:ring-orange-300 outline-none transition-all"
                rows={2}
                placeholder="Contacto, dirección, otras especificaciones... (opcional)"
                maxLength={120}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
            ></textarea>
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