import {NextFunction, Request, Response} from 'express';
import Product from '../models/ProductModel';

export async function checkRegister(req: Request, res: Response, next: NextFunction){
    const {name, registedBy, status, categorie} = req.body;
    const hasRegister = await namehasRegisted(name, categorie);
    if(hasRegister){
        return res.status(400).json({
            isSucess: false,
            requestMessage: 'Já existe um produto registrado nesta categoria'
        })
    }

    next();
}

export async function namehasRegisted(name: string, categorie: string){
    
    const hasRegister = await Product.findOne({name: name, categorie: categorie});
    return hasRegister? true : false;
}