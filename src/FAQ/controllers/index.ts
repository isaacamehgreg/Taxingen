import { NextFunction, Request, Response} from "express";

import { Faq } from "../faq.entities";



const getFaq = async (req: Request, res: Response, next: NextFunction) =>{

    const allFaq = await Faq.find();
    if(!allFaq){
        res.status(404).json({status:'failed', message:"couldnt find Faq"});       
    }
    //replace with the category
    
    res.status(202).json({status:'success', data:allFaq});

}

const addFaq = async (req: Request, res: Response, next: NextFunction) =>{
     const {catId,question,answer} = req.body;

     if(!catId && !question && !answer){
        res.status(400).json({status:'failed', message:"field cannot be empty"});  
     }
     const newFaq = new Faq;
     newFaq.catId = catId;
     newFaq.question = question;
     newFaq.answer = answer;
     await newFaq.save();

     if(!newFaq){
        res.status(404).json({status:'failed', message:"failed to create Faq"});    
     }
  
     return res.status(201).json({status:'success', data: newFaq});  

}


const editFaq = async (req: Request, res: Response, next: NextFunction) =>{
     const catId:any = req.params.catId;
     const {question,answer} = req.body;


     if(!question && !answer){
        res.status(400).json({status:'failed', message:"field cannot be empty"});  
     }

    const check = await Faq.findOne({id:catId})
     if(!check){
        return res.status(404).json({message:'Faq not found'});  
     }


    const update = await Faq.update({id: catId}, {question: question, answer: answer});
   
    if(!update){
       return res.status(404).json({status:'failed', message:"couldnt find Faq with the id"});
    }
     return res.status(201).json({status:'success', message:"Faq updated successfully"});

}


const deleteFaq = async (req: Request, res: Response, next: NextFunction) =>{
    const catId:any = req.params.catId;
    const delCat = await Faq.delete({id:catId});
    if(!delCat){
        res.status(404).json({status:'failed', message:"couldnt find Faq to delete"});
    }
    res.status(201).json({status:'success', message:"Faq deleted successfully"});
}


export default {
    getFaq,
    addFaq,
    editFaq,
    deleteFaq
}