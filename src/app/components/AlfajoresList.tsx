import { useEffect, useState } from "react";

import Background from '../layout/Background'

import { IAlfajorSelected } from "../interface/Alfajor"
import { AlfajoresListPropsType } from '../types/props.types'

const AlfajoresList = ({ alfajores, createAlfajor, createKiosco, error, kiosco }: AlfajoresListPropsType) => {

    const [alfajoresState, setAlfajoresState] = useState<IAlfajorSelected[]>([]);

    const toggleSelection = (id: string) => {
        setAlfajoresState((prevState) =>
            prevState.map((alfajor) =>
                alfajor.id === id
                    ? { ...alfajor, isSelected: !alfajor.isSelected }
                    : alfajor
            )
        );
    };

    useEffect(() => {
        if (kiosco.id) {

            const updatedAlfajores = alfajores.map((alfajor) => ({
                ...alfajor,
                isSelected: kiosco.alfajores!.some(
                    (kioscoAlfajor) => kioscoAlfajor.alfajor === alfajor.alfajor
                )
            }))

            const arr = updatedAlfajores
                .sort((a, b) => a.alfajor.localeCompare(b.alfajor))
                .sort((a, b) => (b.isSelected as any) - (a.isSelected as any))

            setAlfajoresState(arr)

        } else {
            const updatedAlfajores = alfajores.map((alfajor) => ({
                ...alfajor,
                isSelected: false,
            }));
            setAlfajoresState(updatedAlfajores.sort((a, b) => a.alfajor.localeCompare(b.alfajor)))
        }
    }, [alfajores])

    return (
        <Background zIndex="z-20">
            <div className="w-full h-full flex flex-col">
                <div className="flex-1 overflow-hidden">
                    <p className="my-2 text-center text-lg text-amber-600 font-semibold">Selecciona los alfajores disponibles</p>
                    <div className="w-full py-3 flex justify-evenly items-center flex-wrap">
                        <p className="text-lg text-amber-600 text-center">¿No encuentra su alfajor?</p>
                        <button className="px-2 py-1 bg-amber-500 cursor-pointer hover:bg-amber-600 active:bg-amber-500" onClick={createAlfajor}>
                            <p className="text-lg font-semibold text-white">Añadir</p>
                        </button>
                    </div>
                    {
                        error && <p className="text-lg text-emerald-500 text-center my-1">{error}</p>
                    }
                    <div className="w-full h-3/4 overflow-y-auto">
                        {
                            alfajoresState.map((alfajor) => {
                                return <button
                                    className="w-full px-2 py-4 flex flex-1 items-center justify-between flex-row border border-white bg-amber-600
                            cursor-pointer hover:bg-amber-500 active:bg-amber-600"
                                    key={alfajor.id}
                                    onClick={() => toggleSelection(alfajor.id)}>
                                    <p className="text-lg text-white">{alfajor.alfajor}</p>
                                    <input
                                        type="checkbox"
                                        checked={alfajor.isSelected}
                                        onChange={() => toggleSelection(alfajor.id)}
                                        color={"#fcc89f"}
                                    />
                                </button>
                            })
                        }
                    </div>
                </div>
                <div className="w-full">
                    <button onClick={() => createKiosco(alfajoresState)}
                        className="p-3 cursor-pointer text-white text-xl w-full font-semibold w-2/3 bg-amber-500 hover:bg-amber-600 active:bg-amber-500 my-2">
                        Aceptar
                    </button>
                </div>
            </div>
        </Background>
    )
}

export default AlfajoresList