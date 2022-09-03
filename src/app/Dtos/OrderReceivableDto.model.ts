import { ApiResponse } from "../models/ApiResponse";
import { Payment } from "../models/Payment.model";
import { ProductResume } from "../models/Product.model";
import { Visit } from "../models/Visit.model";

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
    products: ProductResume[];
    visits: Visit[];
    collector_name: string;
    payment_method: string;
    way_to_pay: string;
    deadline: number;
    subtotal: number;
    subtotal0: number;
    subtotal2: number;
    iva: number;
    discount: number;
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

export interface SummaryOrdersOfDayResp extends ApiResponse{
    data: SummaryOrderOfDay[]
}

export interface SummaryOrderOfDay{
    id_order: number;
    order_number: string;
    full_names: string;
    total_amount: string;
    date: string;
    username: string;
}

export interface CustomerDebs{
    id_order: number;
    order_number: string;
    full_names: string;
    total_amount: string;
    date: string;
    username: string;
}

export interface SummaryCustomerDebs{
    total: number;
    lastVisit: string;
    debs: CustomerDebs[]
}

