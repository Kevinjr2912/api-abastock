export class ProductBarcode {
  constructor(
    public readonly productBarcodeId: string,
    public presentationId: string,
    public barcode: string,
    public isActive: boolean = true,
  ) {}

  deactivate() {
    this.isActive = false;
  }

  getId(): string {
    return this.productBarcodeId;
  }
}
