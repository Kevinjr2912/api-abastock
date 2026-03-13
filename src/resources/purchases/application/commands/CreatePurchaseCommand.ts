import { CreatePurchaseDto } from "../../dtos/inputs/CreatePurchase_dto";

export class CreatePurchaseCommand implements ICommand {
    constructor (public readonly payload: CreatePurchaseDto){}
}