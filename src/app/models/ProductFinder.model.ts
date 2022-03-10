import { ApiResponse } from "./ApiResponse";

export interface ProductFinder{
    id: number,
    quantity: number,
    name: string,
    sale_price: number
}

export interface ProductsFinderResp extends ApiResponse{
    data: ProductFinder[]
}

export interface ProductFinderResp extends ApiResponse{
    data: ProductFinder
}