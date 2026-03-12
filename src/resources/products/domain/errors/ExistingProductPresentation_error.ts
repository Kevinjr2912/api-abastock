export class ExistingProductPresentationError extends Error {
  constructor() {
    super("La presentación ya existe para este producto");
    this.name = "ExistingProductPresentationError";
  }
}