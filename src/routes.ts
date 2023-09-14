import { Router } from "express";
import ProductController from "./controllers/productController";
import { checkRegister } from "./middlewares/checkRegister";
const routes = Router();


routes.post('/post/registerproduct', checkRegister, ProductController.Register);

routes.get('/get/getallproducts', ProductController.getAllProducts)
routes.get('/get/getonelist/:namelist', ProductController.getOneList);
routes.delete('/delete/removecategorie/:categorie', ProductController.DeleteCategorieProducts);
routes.delete('/delete/removeitem/:nameproduct/:categorie', ProductController.DeleteItem)

export default routes