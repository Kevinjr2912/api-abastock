export class ExistingStoreError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ExistingStoreError";
    }
}
