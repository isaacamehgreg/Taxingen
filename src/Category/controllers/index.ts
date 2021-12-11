import { NextFunction, Request, Response} from "express";
import { addCat } from "../services/addcat";



export const addCategory = (req: Request, res: Response, next: NextFunction) =>{
     const {name} = req.body;

     const newCategory = addCat(name);
    return res.status(200).json(newCategory);

}