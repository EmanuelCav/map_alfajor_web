import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IKiosco } from "../interface/Kiosco";
import { IStore } from "../interface/General";

export const generalStore = create(
    persist<IStore>(
        (set) => ({
            kioscos: [],
            kiosco: {},
            showKioscos: (kioscos: IKiosco[]) => set(() => ({
                kioscos
            })),
            showKiosco: (kiosco: IKiosco) => set(() => ({
                kiosco
            })),
            uploadKiosco: (kiosco: IKiosco) => set((state) => ({
                kioscos: [...state.kioscos, kiosco]
            })),
            editKiosco: (kiosco: IKiosco) => set((state) => ({
                kioscos: state.kioscos.map((k) => k.id === kiosco.id ? kiosco : k)
            })),
        }),
        {
            name: `${process.env.VITE_STORAGE?.trim()}`
        }
    )
)