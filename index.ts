import ExpressServer from "./server/expressServer";
import { config } from './src/core/configs/Config';
import { errorHandler } from "./src/core/shared/middlewares/ErrorHandler_middleware";
import { authRouter } from "./src/resources/authentication/infraestructure/routes/auth_routes";
import { storesRouter } from "./src/resources/stores/infraestructure/routes/stores_routes";
import { productRouter } from "./src/resources/products/infraestructure/routes/Product_routes";

const HOST: string = '0.0.0.0';
const PORT: number = config.PORT_SERVER;

async function bootstrap() {
  const server = new ExpressServer(HOST, PORT);

  server.getExpress().use('/api/v1/auth', authRouter);
  server.getExpress().use('/api/v1/stores', storesRouter);
  server.getExpress().use('/api/v1/products', productRouter);
  server.getExpress().use(errorHandler);

  try {
    await server.listen();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

bootstrap();