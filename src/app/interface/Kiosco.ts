import { IAlfajorSelected } from "./Alfajor";

export interface IKiosco {
    id?: string;
    latitude?: number;
    longitude?: number;
    details?: string;
    alfajores?: IAlfajorSelected[];
    createdAt?: Date;
}

export interface IAddKiosco {
    latitude: number;
    longitude: number;
    details: string;
    alfajores: IAlfajorSelected[];
    createdAt: Date;
}