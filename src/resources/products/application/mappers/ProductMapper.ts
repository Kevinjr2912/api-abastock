import { Product } from "../../domain/entities/Product";
import { ProductBarcode } from "../../domain/entities/ProductBarcode";
import { ProductPresentation } from "../../domain/entities/ProductPresentation";
import { CreateProductCommand } from "../commands/CreateProductCommand";

export class ProductMapper {
  static fromCreateCommand( command: CreateProductCommand, imageUri: string, existingProduct: Product | null = null ): Product {
    const { productId, name, brandId, categoryId, presentation } = command.payload;

    let product: Product;

    if (existingProduct) {
      const pres = new ProductPresentation(
        presentation.presentationId,
        existingProduct.getId(),
        imageUri,
        presentation.value,
        presentation.unit,
        presentation.salePrice
      );

      const barcodeEntity = new ProductBarcode(
        presentation.barcode.barcodeId,
        pres.getId(),
        presentation.barcode.code,
        presentation.barcode.isActive ?? true,
      );

      pres.addBarcode(barcodeEntity);
      existingProduct.addPresentation(pres);
      product = existingProduct;
    } else {
      product = new Product(productId, categoryId, brandId, name);

      const pres = new ProductPresentation(
        presentation.presentationId,
        product.getId(),
        imageUri,
        presentation.value,
        presentation.unit,
        presentation.salePrice
      );

      const barcodeEntity = new ProductBarcode(
        presentation.barcode.barcodeId,
        pres.getId(),
        presentation.barcode.code,
        presentation.barcode.isActive ?? true,
      );

      pres.addBarcode(barcodeEntity);
      product.addPresentation(pres);
    }

    return product
  }
}
