import { ProductOrderDetail } from "../models/Product.model";

export interface FullOrderDto {
    id_client: number;
    items: ProductOrderDetail[];
    payment_method: number;
    payment_mode: number;
    customer_payment: number;
    change: number;
    discount: number;
    subtotal: number;
    iva: number;
    total: number;
}