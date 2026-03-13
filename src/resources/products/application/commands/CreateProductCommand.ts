import { CreateProductDto } from "../dtos/inputs/CreateProduct_dto";

export class CreateProductCommand {
    constructor (
        public readonly payload: CreateProductDto,
        public readonly imagePath: string
    ){}
}