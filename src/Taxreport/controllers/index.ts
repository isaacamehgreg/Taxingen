import { NextFunction, Request, Response} from "express";
import { Taxreport } from "../taxreport.entities";



const getTaxreport = async (req: Request, res: Response, next: NextFunction) =>{

    const allTaxreport = await Taxreport.find();
    if(!allTaxreport){
        res.status(404).json({status:'failed', message:"couldnt find Taxreport"});       
    }
    //replace with the category
    res.status(202).json({status:'success', data:allTaxreport});

}

const addTaxreport = async (req: Request, res: Response, next: NextFunction) =>{
     const {jurisdictionId,filename} = req.body;

     if(!jurisdictionId && !filename){
        res.status(400).json({status:'failed', message:"field cannot be empty"});  
     }
     const newTaxreport = new Taxreport;
     newTaxreport.jurisdictionId = jurisdictionId;
     newTaxreport.filename = filename;
     await newTaxreport.save();

     if(!newTaxreport){
        res.status(404).json({status:'failed', message:"failed to create Taxreport"});    
     }
  
     return res.status(201).json({status:'success', data: newTaxreport});  

}


const editTaxreport = async (req: Request, res: Response, next: NextFunction) =>{
     const taxreportId:any = req.params.taxreportId;
     const {filename,jurisdictionId} = req.body;


     if(!filename && !jurisdictionId){
        res.status(400).json({status:'failed', message:"field cannot be empty"});  
     }

    const check = await Taxreport.findOne({id:taxreportId})
     if(!check){
        return res.status(404).json({message:'Taxreport not found'});  
     }


    const update = await Taxreport.update({id: taxreportId}, {jurisdictionId: jurisdictionId, filename: filename});
   
    if(!update){
       return res.status(404).json({status:'failed', message:"couldnt find Taxreport with the id"});
    }
     return res.status(201).json({status:'success', message:"Taxreport updated successfully"});

}


const deleteTaxreport = async (req: Request, res: Response, next: NextFunction) =>{
    const taxreportId:any = req.params.taxreportId;
    const deleteTaxreport = await Taxreport.delete({id:taxreportId});
    if(!deleteTaxreport){
        res.status(404).json({status:'failed', message:"couldnt find Taxreport to delete"});
    }
    res.status(201).json({status:'success', message:"Taxreport deleted successfully"});
}


export default {
    getTaxreport,
    addTaxreport,
    editTaxreport,
    deleteTaxreport
}