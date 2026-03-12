import * as z from "zod";
import dotenv from "dotenv";

dotenv.config();

const ConfigSchema = z.object({
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  DB_PORT: z.coerce.number(),
  SECRET_KEY: z.string(),
  REFRESH_SECRET: z.string(),
  SALT: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  PORT_SERVER: z.coerce.number().default(3000),
});

export const config = ConfigSchema.parse(process.env);