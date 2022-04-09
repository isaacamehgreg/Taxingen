import { NextFunction, Request, Response} from "express";
import { Jurisdiction } from "../../Jurisdiction/jurisdiction.entities";
import { Filename } from "../filename.entities";
import { User } from '../../User/user.entity';
import { sendTwelveMonthMail } from "../../utils/sendTwelvemonthMail";
import {sendSixMail} from "../../utils/sendSixmonthMail";
import moment from "moment";





const getFilename = async (req: Request, res: Response, next: NextFunction) =>{

    const allFilename = await Filename.find();
    if(!allFilename){
        res.status(404).json({status:'failed', message:"couldnt find Taxreport"});       
    }
    res.status(202).json({status:'success', data:allFilename});

}

const addFilename = async (req: Request, res: Response, next: NextFunction) =>{
     const {name, jurisdictionId, period, userId, created_at, expiration_date} = req.body;

     if(!name){
        res.status(404).json({status:'failed', message:"please provide name and jurisdictionId"});    
     }

     const jurisdiction = await Jurisdiction.findOne({id:jurisdictionId});
     if(!jurisdiction)return res.status(404).json({message: "jurisdiction not found"})

     const user = await User.findOne({id:userId});
     if(!user)return res.status(404).json({message: "user not found"})

     const check = await Filename.findOne({user});
    // if(check)return res.status(400).json({message:'user already filed a report'})

     if(!created_at)return res.status(400).json({message:'please provided created at date'})
     if(!expiration_date)return res.status(400).json({message:'please provided expiration date'})

     
     const newFilename = new Filename;
     newFilename.name = name;
     newFilename.jurisdiction = jurisdiction;
     newFilename.user = user;
     newFilename.period = period;
     newFilename.created_at = created_at;
     newFilename.expiration_date =  expiration_date;
     await newFilename.save();

     if(!newFilename){
        res.status(404).json({status:'failed', message:"failed to create Taxreport"});    
     }

     sendSixMail(newFilename.user.first_name, newFilename.user.email, newFilename.name, newFilename.jurisdiction.name,created_at,expiration_date, newFilename.user.code,newFilename.user.id)
     

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


const add12MonthFilename = async (req: Request, res: Response, next: NextFunction) =>{
    const {userId, period, reports, created_at, expiration_date} = req.body;

    let twelve_month_data =[];
    let twelve_month_text ='';
 
    const user = await User.findOne({id:userId});
    if(!user)return res.status(404).json({message: "user not found"})

    //check that all Jurisdiction is correct
    for(let i=0; i<reports.length; i++){
        const jurisdiction = await Jurisdiction.findOne({id:reports[i].jurisdictionId});
        if(!jurisdiction)return res.status(404).json({message: `jurisdiction for the report name ${reports[i].name} is not found`})
    }

    if(!created_at)return res.status(400).json({message:'please provided created at date'})
    if(!expiration_date)return res.status(400).json({message:'please provided expiration date'})

    for(let i=0; i<reports.length; i++){
        const newFilename = new Filename;
        newFilename.name = reports[i].name;
        newFilename.jurisdiction = reports[i].jurisdictionId;
        newFilename.user = user;
        newFilename.period = period;
        newFilename.created_at = created_at //moment().format('DD/MM/YYYY HH:mm');`
        newFilename.expiration_date = expiration_date // moment().add(1,'year').format('DD/MM/YYYY HH:mm');
        await newFilename.save();

        let getJurisdiction = await Jurisdiction.findOne({id:reports[i].jurisdictionId});
        twelve_month_data.push({Name:reports[i].name, Jurisdiction: getJurisdiction?.name});
        twelve_month_text += `Name: ${reports[i].name} Jurisdiction: ${getJurisdiction?.name}   `
    }

    //send 12month email notification
    console.log(twelve_month_data);
    console.log(twelve_month_text);
    sendTwelveMonthMail(user.first_name,user.email,created_at, expiration_date,twelve_month_data)


    return res.status(201).json({status:'success', message:"user has filed 12 month taxreport" });  
}
 

export default {
    getFilename,
    addFilename,
    editFilename,
    deleteFilename,
    add12MonthFilename
}