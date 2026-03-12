import { ProductBarcode } from "./ProductBarcode";

export class ProductPresentation {
  private barcodes: ProductBarcode[] = [];

  constructor(
    public readonly presentationId: string,
    public productId: string,
    public imageUri: string,
    public value: number,
    public unit: string,
    public salePrice: number,
  ) {}

  addBarcode(barcode: ProductBarcode) {
    this.barcodes.push(barcode);
  }

  getBarcodes(): ProductBarcode[] {
    return this.barcodes;
  }

  getId(): string {
    return this.presentationId;
  }

  getProductId(): string {
    return this.productId;
  }

  getImageUri(): string {
    return this.imageUri;
  }

  getValue(): number {
    return this.value;
  }

  getUnit(): string {
    return this.unit;
  }

  getSalePrice(): number {
    return this.salePrice;
  }
}