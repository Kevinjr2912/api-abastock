import { InventoryProductDto } from "../../dtos/outputs/InventoryProduct_dto";
import { InventoryQueryRepository } from "../../ports/IInventory_repository";
import { ListInventoryProductsQuery } from "../ListInventoryProductsQuery";

export class ListInventoryProductsQueryHandler 
implements IQueryHandler<ListInventoryProductsQuery,InventoryProductDto[]> {
  constructor(private readonly inventoryQueryRepository: InventoryQueryRepository) {}

  async handle(query: ListInventoryProductsQuery): Promise<InventoryProductDto[]> {
    return this.inventoryQueryRepository.findByStore(query.storeId);
  }
}
