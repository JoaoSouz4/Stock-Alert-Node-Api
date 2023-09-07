import Product from "../models/ProductModel";
import { Request, Response } from "express";

class ProductController {
    public static async Register(req: Request, res: Response){
        const {name, registedBy, status, categorie} = req.body;
        try{
            const product = await Product.create({
                name: name,
                registedBy: registedBy,
                createdAt: new Date,
                status: status,
                categorie: categorie
            })

            res.status(200).json({
                isSucess: true,
                requestMessage: 'Produto registrado com sucesso',
                data: {
                    product: product
                }
            })
        }catch(err){
            console.log(err)
        }
    }


    public static async getAllProducts (req: Request, res: Response){
        const products = await Product.find({});
        res.status(200).json({
            isSucess: true,
            requestMessage: 'Todos os produtos retornados com sucesso',
            data: {
                products: products
            }
        })
    }


    public static async getAllCape (req: Request, res: Response){
        const capes = await Product.find({categorie: 'cape'});
        res.status(200).json({
            isSucess: true,
            requestMessage: 'Todos os capinhas retornados com sucesso',
            data: {
                products: capes
            }
        })
    }

    public static async getAllMobileFilm (req: Request, res: Response){
        const mobileFilm = await Product.find({categorie: 'mobileFilm'});
        res.status(200).json({
            isSucess: true,
            requestMessage: 'Todos os películas retornados com sucesso',
            data: {
                products: mobileFilm,
            }
        })
    }

    public static async getAllCable (req: Request, res: Response){
        const cable = await Product.find({categorie: 'cable'});
        res.status(200).json({
            isSucess: true,
            requestMessage: 'Todos os cabos retornados com sucesso',
            data: {
                products: cable,
            }
        })
    }

    public static async getAllDisplay (req: Request, res: Response){
        const display = await Product.find({categorie: 'display'});
        res.status(200).json({
            isSucess: true,
            requestMessage: 'Todos os displays retornados com sucesso',
            data: {
                products:  display,
            }
        })
    }

    public static async getAllAccessorie (req: Request, res: Response){
        const accessorie = await Product.find({categorie: 'accessorie'});
        res.status(200).json({
            isSucess: true,
            requestMessage: 'Todos os acessórios retornados com sucesso',
            data: {
                products: accessorie,
            }
        })
    }
}

export default ProductController;