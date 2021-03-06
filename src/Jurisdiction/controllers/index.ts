import { NextFunction, Request, Response} from "express";
import { Jurisdiction } from "../jurisdiction.entities";
import { Like } from "typeorm";
import console from "console";




const getJurisdiction = async (req: Request, res: Response, next: NextFunction) =>{

    const allJurisdiction = await Jurisdiction.find({relations:['filename']});
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
     const jurisId:any = req.params.jurisId;
     const {name} = req.body;

  
     if(!name){
         return res.status(400).json({message:'field can not be empty'});
     }

     const check = await Jurisdiction.findOne({id:jurisId})
     if(!check){
        return res.status(404).json({message:'Jurisdiction not found'});  
     }


    const update = await Jurisdiction.update({id: jurisId}, {name: name});
    console.log(update);
    if(!update){
       return res.status(404).json({status:'failed', message:"couldnt find Jurisdiction with the id"});
    }
     return res.status(201).json({status:'success', message:"Jurisdiction updated successfully"});

}

const deleteJurisdiction = async (req: Request, res: Response, next: NextFunction) =>{
    const jurisId:any = req.params.jurisId;
    const deljuris = await Jurisdiction.delete({id:jurisId});
    if(!deljuris){
        res.status(404).json({status:'failed', message:"couldnt find Jurisdiction to delete"});
    }
    res.status(201).json({status:'success', message:"Jurisdiction deleted successfully"});
}

const searchJurisdiction = async (req: Request, res: Response, next: NextFunction)=>{
    const query:string|any = req.query.query
   
    var queries = [];
    
     if(query.includes(' ')){
       queries = query.split(' ');
     }else{
         queries.push(query);
     }

     console.log(queries)

      var result = [];

     if(queries.length > -1) {
    
        for(var i= 0; i<queries.length; i++) {
          var file =  await Jurisdiction.find({name: Like("%"+queries[i]+"%")})
          result.push(file);
          console.log(queries[i])
        }
    
      }else{
        console.log('here');
        result.push(await Jurisdiction.find())
      }
      res.status(200).json({status: 'success', result})
}


export default {
    getJurisdiction,
    addJurisdiction,
    editJurisdiction,
    deleteJurisdiction,
    searchJurisdiction
}