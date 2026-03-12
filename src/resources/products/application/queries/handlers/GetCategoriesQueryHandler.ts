import { CategoryDto } from "../../dtos/outputs/Category_dto";
import { ProductQueryRepository } from "../../ports/IProductQuery_repository";
import { GetCategoriesQuery } from "../GetCategoriesQuery";

export class GetCategoriesQueryHandler implements IQueryHandler<GetCategoriesQuery, CategoryDto[]> {

    constructor(private readonly productQueryRepository: ProductQueryRepository) {}

    async handle(): Promise<CategoryDto[]> {
        return this.productQueryRepository.getCategories();
    }
}