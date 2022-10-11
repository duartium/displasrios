import { ApiResponse } from "./ApiResponse";

export interface SaleCreated{
    orderNumber: number;
    sendEmail: boolean;
}

export interface SaleResponse extends ApiResponse{
    data: SaleCreated;
}