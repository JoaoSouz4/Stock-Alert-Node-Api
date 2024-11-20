import { Router } from "express";
import ProductController from "./controllers/productController";
import { checkRegister } from "./middlewares/checkRegister";
import { CheckRegisterUpdate } from "./middlewares/checkRegisterUpdate";
const routes = Router();


routes.post('/post/registerproduct', checkRegister, ProductController.Register);
routes.post('/update/updateitem/:id', CheckRegisterUpdate, ProductController.UpdateItem);

routes.get('/get/getallproducts', ProductController.getAllProducts)
routes.get('/get/getonelist/:namelist', ProductController.getOneList);
routes.get('/get/getoneproduct/:id', ProductController.GetOneProduct)

routes.delete('/delete/removecategorie/:categorie', ProductController.DeleteCategorieProducts);
routes.delete('/delete/removeitem/:nameproduct/:categorie', ProductController.DeleteItem);
routes.get('/get/getpdf', ProductController.genPdf)


export default routes