import { ProductCommandRepository } from "../../../domain/repositories/IProductCommand_repository";
import { ProductMapper } from "../../mappers/ProductMapper";
import { ProductQueryRepository } from "../../ports/IProductQuery_repository";
import { ImageStorageService } from "../../services/ImageStorage_service";
import { CreateProductCommand } from "../CreateProductCommand";
import { ExistingProductPresentationError } from '../../../domain/errors/ExistingProductPresentation_error';
import { InventoryCommandRepository } from "../../../../inventories/application/domain/repositories/IInventoryCommand_repository";
import { CreatedProductInventoryDto } from "../../dtos/outputs/CreatedProductInventory_dto";
import { Product } from "../../../domain/entities/Product";
import { ProductPresentation } from "../../../domain/entities/ProductPresentation";

export class CreateProductCommandHandler implements ICommandHandler<CreateProductCommand, CreatedProductInventoryDto> {
  constructor(
    private readonly productCommandRepository: ProductCommandRepository,
    private readonly productQueryRepository: ProductQueryRepository,
    private readonly inventoryCommandRepository: InventoryCommandRepository,
    private readonly imageStorageService: ImageStorageService,
  ) {}

  async handle(command: CreateProductCommand): Promise<CreatedProductInventoryDto>  {
    const { name, brandId, categoryId, presentation, storeId } = command.payload;

    const existingProduct = await this.productQueryRepository.findByNameBrandCategory(name,brandId,categoryId);

    await this.ensurePresentationDoesNotExist(existingProduct?.getId(), presentation);

    const imageUri = await this.imageStorageService.saveImage(command.imagePath);

    const product = ProductMapper.fromCreateCommand(command, imageUri, existingProduct);
    const presentationEntity = product.getPresentations()[0];

    await this.persistProduct(existingProduct, product, presentationEntity);

    const inventoryId = await this.inventoryCommandRepository.addInventory(storeId,presentationEntity.getId(),0,0);

    return {
      inventoryId,
      product: {
        productName: product.getName(),
        brandId: brandId,
        categoryId: categoryId
      },
      productPresentation: {
        barCode: Number(presentationEntity.getBarcodes()[0].barcode),
        imageUri: presentationEntity.getImageUri(),
        value: presentationEntity.getValue(),
        unit: presentationEntity.getUnit(),
        stock: 0
      }
    };
  }

  private async ensurePresentationDoesNotExist(productId: string | undefined, presentation: { value: number; unit: string }): Promise<void> {
    if (!productId) return;

    const exists = await this.productQueryRepository.findPresentation(
      productId,
      presentation.value,
      presentation.unit,
    );


    if (exists) {
      throw new ExistingProductPresentationError();
    }
  }

  private async persistProduct(
    existingProduct: Product | null,
    product: Product,
    presentation: ProductPresentation,
  ): Promise<void> {
    if (existingProduct) {
      await this.productCommandRepository.addPresentation(existingProduct.getId(), presentation);
      return;
    }

    await this.productCommandRepository.save(product);
  }
}