import { Router } from "express";
import ProductController from "./controllers/productController";

const routes = Router();


routes.post('/post/registerproduct', ProductController.Register);

routes.get('/get/getallproducts', ProductController.getAllProducts)
routes.get('/get/getallcape', ProductController.getAllCape)
routes.get('/get/getallmobilefilm', ProductController.getAllMobileFilm)
routes.get('/get/getallaccessorie', ProductController.getAllAccessorie)
routes.get('/get/getallcable', ProductController.getAllCable)
routes.get('/get/getalldisplay', ProductController.getAllDisplay)

export default routes