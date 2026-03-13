import { InventoryProductDto } from "../../dtos/InventoryProduct_dto";
import { InventoryQueryRepository } from "../../ports/IInventory_repository";
import { FindProductByBarcodeQuery } from "../FindProductByBarcodeQuery";


export class FindProductByBarcodeQueryHandler implements IQueryHandler<
  FindProductByBarcodeQuery, InventoryProductDto | null
> {
  constructor(private readonly inventoryQueryRepository: InventoryQueryRepository) {}

  async handle(query: FindProductByBarcodeQuery) {
    return this.inventoryQueryRepository.findByBarcode(query.storeId, query.barcode);
  }
}