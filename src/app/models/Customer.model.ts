import { ApiResponse } from "./ApiResponse";

export interface Customer {
    id: number;
    type: number;
    ident_type: string;
    identification: string;
    names: string;
    surnames: string;
    address: string;
    phone: string;
    email: string;
    created_at: string;
}

export interface CustomerResponse extends ApiResponse{
    data: Customer[]
}

export interface BestCustomer {
    id: number;
    totalPurchases: number;
    fullNames: string;
}