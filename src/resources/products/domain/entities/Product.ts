import { ProductPresentation } from "./ProductPresentation";

export class Product {
  private presentations: ProductPresentation[] = [];

  constructor(
    public readonly productId: string,
    public categoryId: string,
    public brandId: string,
    public name: string,
  ) {}

  getPresentations(): ProductPresentation[] {
    return this.presentations;
  }

  addPresentation(presentation: ProductPresentation) {
    this.presentations.push(presentation);
  }

  getId(): string {
    return this.productId;
  }
}
