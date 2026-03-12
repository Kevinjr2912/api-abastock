import { Product } from "../entities/Product";
import { ProductPresentation } from "../entities/ProductPresentation";

export interface ProductCommandRepository {
    save(product: Product): Promise<void>;
    addPresentation(productId: string, pres: ProductPresentation): Promise<void>;
}