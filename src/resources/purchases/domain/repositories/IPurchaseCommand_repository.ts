import { Purchase } from "../entities/Purchase";

export interface IPurchaseCommandRepository {
    createPurchase(purchase: Purchase): Promise<void>;
}