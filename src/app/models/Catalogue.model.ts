import { ItemCatalogue } from "./ItemCatalogue.model";

export interface Catalogue{
    id: number;
    name: string;
    item: ItemCatalogue[]
}