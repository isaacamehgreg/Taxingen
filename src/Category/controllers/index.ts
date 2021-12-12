import { NextFunction, Request, Response} from "express";
import { Category } from "../categories.entities";



const getCategory = async (req: Request, res: Response, next: NextFunction) =>{

    const allCategory = await Category.find();
    if(!allCategory){
        res.status(404).json({status:'failed', message:"couldnt find category"});       
    }
    res.status(202).json({status:'success', data:allCategory});

}

const addCategory = async (req: Request, res: Response, next: NextFunction) =>{
     const {name} = req.body;

     const newCategory = new Category;
     newCategory.name = name;
     await newCategory.save();

     if(!newCategory){
        res.status(404).json({status:'failed', message:"failed to create category"});    
     }
  
     return res.status(201).json({status:'success', data: newCategory});  

}

const editCategory = async (req: Request, res: Response, next: NextFunction) =>{
     const catId:any = req.params.catId;
     const {name} = req.body;

  

     if(!name){
         return res.status(400).json({message:'field can not be empty'});
     }

     const check = await Category.findOne({id:catId})
     if(!check){
        return res.status(404).json({message:'category not found'});  
     }


    const update = await Category.update({id: catId}, {name: name});
    console.log(update);
    if(!update){
       return res.status(404).json({status:'failed', message:"couldnt find category with the id"});
    }
     return res.status(201).json({status:'success', message:"category updated successfully"});

}

const deleteCategory = async (req: Request, res: Response, next: NextFunction) =>{
    const catId:any = req.params.catId;
    const delCat = await Category.delete({id:catId});
    if(!delCat){
        res.status(404).json({status:'failed', message:"couldnt find category to delete"});
    }
    res.status(201).json({status:'success', message:"category deleted successfully"});
}


export default {
    getCategory,
    addCategory,
    editCategory,
    deleteCategory
}