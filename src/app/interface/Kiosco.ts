import { IAlfajorSelected } from "./Alfajor";

export interface IKiosco {
    id?: string;
    latitude?: number;
    longitude?: number;
    alfajores?: IAlfajorSelected[];
    createdAt?: Date;
}

export interface IAddKiosco {
    latitude: number;
    longitude: number;
    alfajores: IAlfajorSelected[];
    createdAt: Date;
}