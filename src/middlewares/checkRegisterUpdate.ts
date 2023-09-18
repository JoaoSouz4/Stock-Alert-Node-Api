import { Request, Response, NextFunction} from 'express';
import Product from '../models/ProductModel';
import {namehasRegisted} from './checkRegister';

export async function CheckRegisterUpdate(req: Request, res: Response, next: NextFunction){
    const idItem = req.params.id;
    const {name, status, categorie} = req.body;

    const targetItem = await Product.findById({_id: idItem});
    const isRegisted = await Product.findOne({name: name, categorie: categorie});

    if(isRegisted){
        if(isRegisted._id.equals(idItem)){
            next();
        } else {
            if(isRegisted.name == targetItem?.name){
                console.log(isRegisted, targetItem)
                res.status(400).json({
                    isSucess: false,
                    requestMessage: 'Este nome não está disponível'
                })
            }
        }
    }
    
}