import { PurchaseItemDto } from "./PurchaseItem_dto";

export interface CreatePurchaseDto {
    purchaseId:   string;
    storeId:      string;
    purchaseDate: Date;
    totalCost:    number;
    purchaseItems: PurchaseItemDto[];
}