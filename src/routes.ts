import { Router } from "express";
import ProductController from "./controllers/productController";

const routes = Router();


routes.post('/post/registerproduct', ProductController.Register);

routes.get('/get/getallproducts', ProductController.getAllProducts)
routes.get('/get/getonelist/:namelist', ProductController.getOneList)

export default routes