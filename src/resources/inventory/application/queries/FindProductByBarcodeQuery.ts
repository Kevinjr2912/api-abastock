export class FindProductByBarcodeQuery {
  constructor(
    public readonly storeId: string,
    public readonly barcode: string
  ) {}
}