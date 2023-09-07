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


    public static async getOneList(req: Request, res: Response){
        const nameList = req.params.namelist;
        const products = await Product.find({categorie: nameList});
        res.status(200).json({
            isSucess: true,
            requestMessage: `Todos os produtos da categoria ${nameList} retornados com sucesso`,
            data: {
                products: products
            }
        })

    }
}

export default ProductController;