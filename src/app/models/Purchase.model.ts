import { ProductSimpleItem } from "./ProductItem.model";

export interface PurchaseCreate {
    idProvider: number;
    date: string;
    numInvoice: string;
    total: number;
    observations: string;
    items: ProductSimpleItem[];
}