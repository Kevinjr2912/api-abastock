export interface InventoryProductDto {
  inventoryId:  string;
  currentStock: number;
  productName:  string;
  brandName:    string;
  categoryName: string;
  imageUri:     string;
  value:        number;
  unit:         string;
  barcode:      string;
}