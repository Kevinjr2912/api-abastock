import express from 'express';
import { productController } from '../../../dependencies';

export const productRouter = express.Router();

productRouter.post("/", productController.create.bind(productController))