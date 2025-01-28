import { PropsWithChildren } from "react";
import { IAlfajor, IAlfajorSelected } from "../interface/Alfajor";
import { IKiosco } from "../interface/Kiosco";

export type CurrentMarkerPropsType = {
    addAlfajor: () => void;
    acceptAlfajor: () => void;
}

export type AlfajoresListPropsType = {
    createKiosco: (alf: IAlfajorSelected[]) => void;
    alfajores: IAlfajor[];
    kiosco: IKiosco;
    createAlfajor: () => void;
    error: string;
}

export type ShowKioscoPropsType = {
    kiosco: IKiosco;
    acceptKiosco: () => void;
    addAlfajor: () => void;
}

export type SearchInputPropsType = {
    setSearchQuery: (searchQuery: string) => void;
    searchQuery: string;
}

export type ResultSearchPropsType = {
    data: IAlfajor[];
    searchQuery: string;
    handleSearch: (str: string) => void;
}

export type CreateAlfajorFormPropsType = {
    createData: string;
    setCreateData: (createData: string) => void;
    handleCreateAlfajor: () => void;
    error: string;
    handleComeback: () => void;
}

export type BackgroundPropsType = PropsWithChildren<{
    zIndex: string;
}>