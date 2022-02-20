import { NextFunction, Request, Response} from "express"
import { Webinar } from "../webinar.entity"

export const WebinarRegiteration = async(req: Request, res: Response, next: NextFunction) =>{
   const {first_name,last_name,company,email} = req.body
   const register = new Webinar();
   register.first_name = first_name;
   register.last_name = last_name;
   register.company = company;
   register.email = email;
   register.save();

   if(!register)res.status(400).json({message:"fail to register member try again"})

   res.status(201).json({status:'success', message:"attendee registered"})
   
}

export const WebinarAttendees = async(req: Request, res: Response, next: NextFunction) =>{
    const attendees = await Webinar.find();
    res.render('attendees', {attendees:attendees});
}

export const WebinarRemove = async(req: Request, res: Response, next: NextFunction)=>{
    const id = req.params.id;
    const check = await Webinar.findOne({id})

    if(!check)return res.status(404).send('attendee not found');

    const deleteAttendee = await Webinar.delete({id});

    res.redirect('back');
}