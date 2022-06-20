import { Category } from "./Category.model";
import { ItemCatalogue } from "./ItemCatalogue.model";

export interface Product{
    id: number;
    code: string;
    name: string;
    description: string;
    quantity: number;
    cost: number;
    price: number;
    stock: number;
    quantity_per_pack: number;
    quantity_per_bundle: number;
    discount: number;
    iva_tariff: number;
    total: number;
    category: Category;
    provider: ItemCatalogue;
    user_creation: string;
}