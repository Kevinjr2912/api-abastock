export class ExistingEmailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExistingEmailError";
  }
}