import Background from "../layout/Background"
import { ShowKioscoPropsType } from "../types/props.types"

const ShowKiosco = ({ kiosco, acceptKiosco, addAlfajor }: ShowKioscoPropsType) => {
    return (
        <Background zIndex="z-10">
            <div className="w-full h-full flex flex-col">
                <div className="flex-1 overflow-hidden">
                    <p className="text-3xl text-amber-600 font-bold text-center my-2">Alfajores disponibles</p>
                    {
                        kiosco.alfajores?.length! > 0 ? (
                            <div className="w-full h-3/4 overflow-y-auto">
                                {
                                    kiosco.alfajores!.sort((a, b) => a.alfajor.localeCompare(b.alfajor)).map((item) => (
                                        <div key={item.id} className="my-1">
                                            <p className="text-amber-500 text-xl text-center font-semibold">{item.alfajor}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="flex justify-center items-center">
                                <p className="text-xl text-amber-500 font-semibold">¡No hay alfajores en la lista!</p>
                            </div>
                        )
                    }
                </div>
                <div className="w-full">
                    <button
                        onClick={addAlfajor}
                        className="p-3 cursor-pointer text-white text-xl font-semibold w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-500 my-2">
                        🍪 Actualizar Lista 🍪
                    </button>
                    <button
                        onClick={acceptKiosco}
                        className="p-4 cursor-pointer text-white text-xl font-semibold w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-500 my-2">
                        Regresar
                    </button>
                </div>
            </div>
        </Background>
    );
};

export default ShowKiosco;
