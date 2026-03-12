import { GetBrandsQuery } from "../GetbrandsQuery";
import { BrandDto } from '../../dtos/outputs/Brand_dto';
import { ProductQueryRepository } from "../../ports/IProductQuery_repository";

export class GetBrandsQueryHandler implements IQueryHandler<GetBrandsQuery, BrandDto[]> {
    constructor(private readonly productQueryRepository: ProductQueryRepository) {}

    async handle(): Promise<BrandDto[]> {
        return this.productQueryRepository.getBrands();
    }
}