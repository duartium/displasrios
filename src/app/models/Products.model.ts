import { Category } from "./Category.model";
import { ItemCatalogue } from "./ItemCatalogue.model";

export interface Product{
    id: number;
    code: string;
    name: string;
    description: string;
    quantity: number;
    cost: number;
    sale_price: number;
    stock: number;
    quantity_package: number;
    quantity_lump: number;
    discount: number;
    iva_tariff: number;
    total: number;
    category_id: number;
    category_name: string;
    provider_id: number;
    provider_name: string;
    user_creation: string;
}

export interface ProductCreation extends Product{
    category: Category;
    provider: ItemCatalogue;
}