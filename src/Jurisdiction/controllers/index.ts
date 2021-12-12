import { NextFunction, Request, Response} from "express";
import { Jurisdiction } from "../jurisdiction.entities";




const getJurisdiction = async (req: Request, res: Response, next: NextFunction) =>{

    const allJurisdiction = await Jurisdiction.find();
    if(!allJurisdiction){
        res.status(404).json({status:'failed', message:"couldnt find Jurisdiction"});       
    }
    res.status(202).json({status:'success', data:allJurisdiction});

}

const addJurisdiction = async (req: Request, res: Response, next: NextFunction) =>{
     const {name} = req.body;

     const newJurisdiction = new Jurisdiction;
     newJurisdiction.name = name;
     await newJurisdiction.save();

     if(!newJurisdiction){
        res.status(404).json({status:'failed', message:"failed to create Jurisdiction"});    
     }
  
     return res.status(201).json({status:'success', data: newJurisdiction});  

}

const editJurisdiction = async (req: Request, res: Response, next: NextFunction) =>{
     const catId:any = req.params.catId;
     const {name} = req.body;

  

     if(!name){
         return res.status(400).json({message:'field can not be empty'});
     }

     const check = await Jurisdiction.findOne({id:catId})
     if(!check){
        return res.status(404).json({message:'Jurisdiction not found'});  
     }


    const update = await Jurisdiction.update({id: catId}, {name: name});
    console.log(update);
    if(!update){
       return res.status(404).json({status:'failed', message:"couldnt find Jurisdiction with the id"});
    }
     return res.status(201).json({status:'success', message:"Jurisdiction updated successfully"});

}

const deleteJurisdiction = async (req: Request, res: Response, next: NextFunction) =>{
    const catId:any = req.params.catId;
    const delCat = await Jurisdiction.delete({id:catId});
    if(!delCat){
        res.status(404).json({status:'failed', message:"couldnt find Jurisdiction to delete"});
    }
    res.status(201).json({status:'success', message:"Jurisdiction deleted successfully"});
}


export default {
    getJurisdiction,
    addJurisdiction,
    editJurisdiction,
    deleteJurisdiction
}