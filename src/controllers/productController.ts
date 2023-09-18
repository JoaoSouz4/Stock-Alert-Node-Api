import Product from "../models/ProductModel";
import { Request, Response } from "express";

class ProductController {

    public static async GetOneProduct(req: Request, res: Response){
        const id = req.params.id;

        try {
            const product = await Product.findById({_id: id});
            res.status(200).json({
                isSucess: true,
                requestData: product
            })
        } catch (error) {
            console.log(error)
        }
    }
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
                products: products,
                currentAmount: products.length
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
                products: products,
                currentAmount: products.length
            }
        })

    }

    public static async DeleteCategorieProducts(req: Request, res: Response){
        const categorie =  req.params.categorie;

        try {
            await Product.deleteMany({categorie: categorie});
            
            const currentList = await Product.find({categorie: categorie});

            await res.status(200).json({
                isSucess: true,
                requestMessage: `Todos os items da categoria ${categorie} foram excluídos`,
                requestData: {
                    currentList: currentList,
                    currentAmount: currentList.length
                }
            })
        } catch (error) {
            console.log(error)
        } 
    }

    public static async DeleteItem(req: Request, res: Response){
        const name =  req.params.nameproduct;
        const categorie = req.params.categorie;

        try{
            await Product.findOneAndDelete({name: name, categorie: categorie});
            const currentList = await Product.find({categorie: categorie});

            res.status(200).json({
                isSucess: true,
                requestMessage: 'Item deletado',
                requestData: {
                    currentList: currentList,
                    currentAmount: currentList.length
                }
            })
        }catch(error){
            res.status(400).json({
                isSucess: false,
                requestMessage: 'Erro ao deletar item',
                requestData: {
                    data: error
                }
            })
        }
    }

    public static async UpdateItem(req: Request, res: Response){
        const idItem: string = req.params.id;
        const {name, categorie, status} = req.body;
        console.log('name:', name, ' categorie: ', categorie, ' status: ', status)
        try {
            const item = await Product.findById({_id: idItem});
           
            const ItemTarget = await Product.findOneAndUpdate({_id: idItem}, {name: name, categorie: categorie, status: status});
            const currentList = await Product.find({categorie: item?.categorie});
            console.log(currentList)
            res.status(200).json({
                isSucess: true,
                requestMessage: 'item atualizado com sucesso',
                requestData: ItemTarget,
                currentList: currentList,
                currentAmount: currentList.length
            })
        } catch (error) {
            res.status(400).json({
                isSucess: false,
                requestMessage: 'erro ao atualizar item',
                requestData: error,
            })
        }
    }
}

export default ProductController;