import { Product } from "../../domain/entities/Product";
import { BrandDto } from "../dtos/outputs/Brand_dto";
import { CategoryDto } from "../dtos/outputs/Category_dto";

export interface ProductQueryRepository {
    findByNameBrandCategory(name: string, brandId: string, categoryId: string): Promise<Product | null>;
    findPresentation(productId: string, size: number, unit: string): Promise<boolean>;
    getCategories(): Promise<CategoryDto[]>;
    getBrands(): Promise<BrandDto[]>;
}