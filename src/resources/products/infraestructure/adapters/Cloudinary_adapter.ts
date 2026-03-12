import fs from 'fs';
import cloudinary from '../../../../core/configs/Cloudinary_config';
import { ImageStoragePort } from '../../application/ports/IImageStorage_port';

export class Cloudinary implements ImageStoragePort {
    async save(imagePath: string): Promise<string> {
        const result = await cloudinary.uploader.upload(imagePath);
        await fs.promises.unlink(imagePath).catch(console.error);
        return result.secure_url;
    }
}