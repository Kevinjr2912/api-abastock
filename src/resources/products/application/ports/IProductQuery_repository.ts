import { Product } from "../../domain/entities/Product";

export interface ProductQueryRepository {
    findByNameBrandCategory(name: string, brandId: string, categoryId: string): Promise<Product | null>;
    findPresentation(productId: string, size: number, unit: string): Promise<boolean>;
}