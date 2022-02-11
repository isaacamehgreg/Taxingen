import { NextFunction, Request, Response} from "express";
import { Jurisdiction } from "../../Jurisdiction/jurisdiction.entities";
import { Filename } from "../filename.entities";
import { User } from '../../User/user.entity';




const getFilename = async (req: Request, res: Response, next: NextFunction) =>{

    const allFilename = await Filename.find();
    if(!allFilename){
        res.status(404).json({status:'failed', message:"couldnt find Taxreport"});       
    }
    res.status(202).json({status:'success', data:allFilename});

}

const addFilename = async (req: Request, res: Response, next: NextFunction) =>{
     const {name, jurisdictionId, period, userId} = req.body;

     if(!name){
        res.status(404).json({status:'failed', message:"please provide name and jurisdictionId"});    
     }

     const jurisdiction = await Jurisdiction.findOne({id:jurisdictionId});
     if(!jurisdiction)return res.status(404).json({message: "jurisdiction not found"})

     const user = await User.findOne({id:userId});
     if(!user)return res.status(404).json({message: "user not found"})
     
     
     const newFilename = new Filename;
     newFilename.name = name;
     newFilename.jurisdiction = jurisdiction;
     newFilename.user = user;
     newFilename.period = period;
     await newFilename.save();

     if(!newFilename){
        res.status(404).json({status:'failed', message:"failed to create Taxreport"});    
     }

     return res.status(201).json({status:'success', data: newFilename});  
}

const editFilename = async (req: Request, res: Response, next: NextFunction) =>{
     const filenameId:any = req.params.filenameId;
     const {name} = req.body;

     if(!name){
         return res.status(400).json({message:'field can not be empty'});
     }

     const check = await Filename.findOne({id:filenameId})
     if(!check){
        return res.status(404).json({message:'Taxreport not found'});  
     }


    const update = await Filename.update({id: filenameId}, {name: name});
    console.log(update);
    if(!update){
       return res.status(404).json({status:'failed', message:"couldnt find Taxreport with the id"});
    }
     return res.status(201).json({status:'success', message:"Taxreport updated successfully"});

}

const deleteFilename = async (req: Request, res: Response, next: NextFunction) =>{
    const filenameId:any = req.params.filenameId;
    const delfilename = await Filename.delete({id:filenameId});
    if(!delfilename){
        res.status(404).json({status:'failed', message:"couldnt find Taxreport to delete"});
    }
    res.status(201).json({status:'success', message:"Taxreport deleted successfully"});
}


export default {
    getFilename,
    addFilename,
    editFilename,
    deleteFilename
}