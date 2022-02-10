import { NextFunction, Request, Response} from "express";
import { Jurisdiction } from "../../Jurisdiction/jurisdiction.entities";
import { Filename } from "../filename.entities";




const getFilename = async (req: Request, res: Response, next: NextFunction) =>{

    const allFilename = await Filename.find();
    if(!allFilename){
        res.status(404).json({status:'failed', message:"couldnt find Filename"});       
    }
    res.status(202).json({status:'success', data:allFilename});

}

const addFilename = async (req: Request, res: Response, next: NextFunction) =>{
     const {name, jurisdictionId} = req.body;

     if(!name || !jurisdictionId){
        res.status(404).json({status:'failed', message:"please provide name and jurisdictionId"});    
     }

     const jurisdiction = await Jurisdiction.findOne({id:jurisdictionId});
     if(!jurisdiction)return res.status(404).json({message: "jurisdiction not found"})

     const newFilename = new Filename;
     newFilename.name = name;
     newFilename.jurisdiction = jurisdiction;
     await newFilename.save();

     if(!newFilename){
        res.status(404).json({status:'failed', message:"failed to create Filename"});    
     }

     return res.status(201).json({status:'success', data: newFilename});  
}

const editFilename = async (req: Request, res: Response, next: NextFunction) =>{
     const catId:any = req.params.catId;
     const {name} = req.body;

  

     if(!name){
         return res.status(400).json({message:'field can not be empty'});
     }

     const check = await Filename.findOne({id:catId})
     if(!check){
        return res.status(404).json({message:'Filename not found'});  
     }


    const update = await Filename.update({id: catId}, {name: name});
    console.log(update);
    if(!update){
       return res.status(404).json({status:'failed', message:"couldnt find Filename with the id"});
    }
     return res.status(201).json({status:'success', message:"Filename updated successfully"});

}

const deleteFilename = async (req: Request, res: Response, next: NextFunction) =>{
    const catId:any = req.params.catId;
    const delCat = await Filename.delete({id:catId});
    if(!delCat){
        res.status(404).json({status:'failed', message:"couldnt find Filename to delete"});
    }
    res.status(201).json({status:'success', message:"Filename deleted successfully"});
}


export default {
    getFilename,
    addFilename,
    editFilename,
    deleteFilename
}