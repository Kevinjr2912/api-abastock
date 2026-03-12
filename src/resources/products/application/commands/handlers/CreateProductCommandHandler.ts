import { ProductCommandRepository } from "../../../domain/repositories/IProductCommand_repository";
import { ProductMapper } from "../../mappers/ProductMapper";
import { ProductQueryRepository } from "../../ports/IProductQuery_repository";
import { ImageStorageService } from "../../services/ImageStorage_service";
import { CreateProductCommand } from "../CreateProductCommand";
import { ExistingProductPresentationError } from '../../../domain/errors/ExistingProductPresentation_error';

export class CreateProductCommandHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    private readonly productCommandRepository: ProductCommandRepository,
    private readonly productQueryRepository: ProductQueryRepository,
    private readonly imageStorageService: ImageStorageService,
  ) {}

  async handle(command: CreateProductCommand): Promise<void> {

    const existingProduct =
      await this.productQueryRepository.findByNameBrandCategory(
        command.payload.name,
        command.payload.brandId,
        command.payload.categoryId,
      );

    // Si el producto existe validamos presentación antes de guardar imagen
    if (existingProduct) {

      const presentationExists =
        await this.productQueryRepository.findPresentation(
          existingProduct.getId(),
          command.payload.presentation.value,
          command.payload.presentation.unit,
        );

      if (presentationExists) {
        throw new ExistingProductPresentationError();
      }
    }

    // Guardamos imagen solo cuando ya sabemos que se puede crear
    const imageUri = await this.imageStorageService.saveImage(
      command.imagePath,
    );

    const product = ProductMapper.fromCreateCommand(
      command,
      imageUri,
      existingProduct,
    );

    if (existingProduct) {

      const productPresentation = product.getPresentations()[0];

      await this.productCommandRepository.addPresentation(
        existingProduct.getId(),
        productPresentation,
      );

    } else {

      await this.productCommandRepository.save(product);

    }
  }
}