import { Request, Response } from "express";
import ExpressServer from "./server/expressServer";
import { config } from "./src/core/Config";

const HOST: string = '0.0.0.0';
const PORT: number = config.PORT_SERVER;

async function bootstrap() {
  const server = new ExpressServer(HOST, PORT);

  server.getExpress().use('/api/v1/', (req: Request, res: Response) => {
    res.json({ message: 'Hello, World!' });
  });

  try {
    await server.listen();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

bootstrap();