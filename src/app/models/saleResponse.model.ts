import { ApiResponse } from "./ApiResponse";

export interface SaleCreated{
    orderNumber: number;
    sendMail: boolean;
}

export interface SaleResponse extends ApiResponse{
    data: SaleCreated;
}