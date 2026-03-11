import { CreateStoreDto } from "../dtos/inputs/CreateStore_dto";

export class CreateStoreCommand {
    constructor(public readonly payload: CreateStoreDto) {}
}
