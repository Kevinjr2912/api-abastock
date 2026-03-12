import { CreateProductDto } from "../dtos/inputs/CreateProduct_dto";
import { ImageFileDto } from "../dtos/inputs/ImageFile_dto";

export class CreateProductCommand {
    constructor (
        public readonly payload: CreateProductDto,
        public readonly imagePath: string
    ){}
}