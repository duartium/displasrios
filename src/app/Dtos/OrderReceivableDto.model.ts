import { ApiResponse } from "../models/ApiResponse";

export interface OrderReceivableDto{
    id: number;
    order_number: string;
    full_names: string;
    total_amount: string;
    date: string;
}

export interface OrderReceivableResp extends ApiResponse{
    data: OrderReceivableDto[]
}