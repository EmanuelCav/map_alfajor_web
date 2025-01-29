
import Background from "../layout/Background"

import { CreateAlfajorFormPropsType } from "../types/props.types"

const CreateAlfajorForm = ({ createData, setCreateData, handleCreateAlfajor, error, handleComeback }: CreateAlfajorFormPropsType) => {
    return (
        <Background zIndex="z-30">
            <div className="w-full h-full flex flex-col">
                <div className="flex-1 overflow-hidden">
                    <p className="my-2 text-center text-lg text-amber-600 font-semibold">Añadir nuevo alfajor</p>
                    {
                        error && <p className="text-red-500 my-1">{error}</p>
                    }
                    <input
                        className={`border ${error ? "border-red-500" : "border-orange-500"} w-full mt-4 p-3 rounded-lg 
                        focus:border-orange-600 focus:ring-2 focus:ring-orange-300 outline-none transition-all`}
                        placeholder="Escribe aquí..."
                        value={createData}
                        onChange={(e) => setCreateData(e.target.value)}
                    />

                </div>
                <div className="w-full">
                    <button onClick={handleCreateAlfajor}
                        className="p-3 cursor-pointer text-white text-xl font-semibold w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-500 my-2">
                        Crear
                    </button>
                    <button onClick={handleComeback}
                        className="p-4 cursor-pointer text-white text-xl font-semibold w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-500 my-2">
                        Regresar
                    </button>
                </div>
            </div>
        </Background>
    )
}

export default CreateAlfajorForm