import { IKiosco } from "./Kiosco";

export interface IStore {
    kioscos: IKiosco[];
    kiosco: IKiosco;
    showKioscos: (kioscos: IKiosco[]) => void;
    showKiosco: (kiosco: IKiosco) => void;
    uploadKiosco: (kiosco: IKiosco) => void;
    editKiosco: (kiosco: IKiosco) => void;
}