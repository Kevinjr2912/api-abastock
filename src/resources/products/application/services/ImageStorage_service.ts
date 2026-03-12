import { ImageStoragePort } from "../ports/IImageStorage_port";

export class ImageStorageService {
    constructor (private readonly imageStoragePort: ImageStoragePort){}

    async saveImage(imagePath: string): Promise<string> {
        return await this.imageStoragePort.save(imagePath);
    }
}