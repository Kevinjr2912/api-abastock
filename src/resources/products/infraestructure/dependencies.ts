import { CreateProductCommandHandler } from "../application/commands/handlers/CreateProductCommandHandler";
import { GetBrandsQueryHandler } from "../application/queries/handlers/GetBrandsQueryHandler";
import { GetCategoriesQueryHandler } from "../application/queries/handlers/GetCategoriesQueryHandler";
import { ImageStorageService } from "../application/services/ImageStorage_service";
import { Cloudinary } from "./adapters/Cloudinary_adapter";
import { ProductCommandPostgreSQL } from "./adapters/ProductCommandPostgreSQL_adapter";
import { ProductQueryPostgreSQL } from "./adapters/ProductQueryPostgreSQL_adapter";

// adapters
const productCommandPostgreSQL = new ProductCommandPostgreSQL();
const productQueryPostgreSQL = new ProductQueryPostgreSQL();
const cloudinary = new Cloudinary();

// service
const imageStorageService = new ImageStorageService(cloudinary);

// handlers

// commands
export const createProductCommandHandler = new CreateProductCommandHandler (
    productCommandPostgreSQL,
    productQueryPostgreSQL,
    imageStorageService
);

// queries
export const getCategoriesQueryHandler = new GetCategoriesQueryHandler(productQueryPostgreSQL);
export const getBrandsQueryHandler = new GetBrandsQueryHandler(productQueryPostgreSQL);