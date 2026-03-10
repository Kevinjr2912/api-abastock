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
  SALT: z.string(),
  PORT_SERVER: z.coerce.number().default(3000),
});

const result = ConfigSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid env:", result.error.issues);
  process.exit(1);
}

export const config = result.data;