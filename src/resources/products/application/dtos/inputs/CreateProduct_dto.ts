export interface CreateProductDto {
  productId:        string;
  name:             string;
  brandId:          string;
  categoryId:       string;
  presentation: {
    presentationId: string;
    value:          number;
    unit:           string;
    salePrice:      number;
    barcode: {
      barcodeId:    string; 
      code:         string; 
      isActive?:    boolean; 
    };
  };
}
