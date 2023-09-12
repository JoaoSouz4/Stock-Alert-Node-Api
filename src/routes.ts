import { Router } from "express";
import ProductController from "./controllers/productController";
import { checkRegister } from "./middlewares/checkRegister";
const routes = Router();


routes.post('/post/registerproduct', checkRegister, ProductController.Register);

routes.get('/get/getallproducts', ProductController.getAllProducts)
routes.get('/get/getonelist/:namelist', ProductController.getOneList)

export default routes