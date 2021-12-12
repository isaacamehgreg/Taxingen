import { NextFunction, Request, Response} from "express";
import { addCat } from "../services/addCat";



const addCategory = async (req: Request, res: Response, next: NextFunction) =>{
     const {name} = req.body;

     const newCategory = addCat(name);
    return res.status(200).json(newCategory);

}

const editCategory = async (req: Request, res: Response, next: NextFunction) =>{

}

const deleteCategory = async (req: Request, res: Response, next: NextFunction) =>{

}



export default {
    addCategory,
    editCategory,
    deleteCategory
}