import { ProductOrderDetail } from "../models/Product.model";

export interface FullOrderDto {
    id_client: number;
    items: ProductOrderDetail[];
    payment_method: number;
    payment_mode: number;
    customer_payment: number;
    deadline: number,
    num_payment_receipt: string;
    change: number;
    discount: number;
    subtotal: number;
    iva: number;
    total: number;
}