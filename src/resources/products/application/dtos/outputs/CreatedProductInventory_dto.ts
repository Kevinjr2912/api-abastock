export interface CreatedProductInventoryDto {
  inventoryId: string;
  product : {
    productName: string;
    brandId: string;
    categoryId: string;
  },
  productPresentation : {
    barCode: number;
    imageUri: string;
    value: number;
    unit: string;
    stock: number
  }
}