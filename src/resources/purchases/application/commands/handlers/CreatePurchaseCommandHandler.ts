import { CreatePurchaseCommand } from "../CreatePurchaseCommand";
import { IPurchaseCommandRepository } from "../../../domain/repositories/IPurchaseCommand_repository";
import { InventoryCommandRepository } from "../../../../inventories/domain/repositories/IInventoryCommand_repository";
import { Purchase } from "../../../domain/entities/Purchase";
import { PurchaseItem } from "../../../domain/entities/PurchaseItem";
import { Inventory } from "../../../../inventories/domain/entities/Inventory";
import { ProductCommandRepository } from "../../../../products/domain/repositories/IProductCommand_repository";

export class CreatePurchaseCommandHandler implements ICommandHandler<CreatePurchaseCommand> {

    constructor(
        private readonly purchaseCommandRepository: IPurchaseCommandRepository,
        private readonly productCommandRepository: ProductCommandRepository,
        private readonly inventoryCommandRepository: InventoryCommandRepository
    ) {}

    async handle(command: CreatePurchaseCommand): Promise<void> {
        const purchase = this.buildPurchase(command);
        await this.purchaseCommandRepository.createPurchase(purchase);
        await this.updateInventoriesAndPrices(command, purchase);
    }

    private async updateInventoriesAndPrices(command: CreatePurchaseCommand, purchase: Purchase): Promise<void> {
        const { storeId } = command.payload;

        for (const item of purchase.getPurchaseItems()) {
            const inventory = new Inventory(
                item.getInventoryId(),
                storeId,
                item.getPresentationId(),
                item.getQuantity()
            );
            
            await this.inventoryCommandRepository.updateInventory(inventory);
            await this.productCommandRepository.updateSalePrice(item.getPresentationId(), item.getSalePrice());
        }
    }

    private buildPurchase(command: CreatePurchaseCommand): Purchase {
        const { purchaseId, storeId, purchaseDate, totalCost, purchaseItems } = command.payload;
        const purchase = new Purchase(purchaseId, storeId, purchaseDate, totalCost);

        for (const item of purchaseItems) {
            purchase.addPurchaseItem(
                new PurchaseItem(
                    item.purchaseItemId,
                    item.presentationId,
                    item.inventoryId,
                    item.quantity,
                    item.costPrice,
                    item.salePrice
                )
            );
        }

        return purchase;
    }
}



