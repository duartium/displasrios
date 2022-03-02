import { ApiResponse } from "./ApiResponse";

export interface CustomerFinder {
    id: number,
    full_names: string,
    identification: string
}

export interface CustomersFinderResp extends ApiResponse{
    data: CustomerFinder[]
}

export interface CustomerFinderResp extends ApiResponse{
    data: CustomerFinder
}