import { ApiResponse } from "../models/ApiResponse";
import { Payment } from "../models/Payment.model";
import { ProductResume } from "../models/Product.model";

export interface OrderReceivableDto{
    id: number;
    order_number: string;
    full_names: string;
    total_amount: string;
    date: string;
}

export interface FullOrderReceivable{
    id: number;
    order_number: string;
    full_names: string;
    total_amount: string;
    date: string;
    balance: number;
    days_debt: number;
    payments: Payment[];
    products: ProductResume[]
}

export interface OrderPaymentRequest{
    id_order: number;
    change: number;
    customer_payment: number;
}

export interface OrderReceivableResp extends ApiResponse{
    data: OrderReceivableDto[]
}

export interface FullOrderReceivableResp extends ApiResponse{
    data: FullOrderReceivable
}