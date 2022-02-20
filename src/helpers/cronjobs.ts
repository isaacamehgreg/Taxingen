// import { sixMonthMail } from "../../utils/sendSixmonthMail";
import { Filename } from "../Filename/filename.entities";

var cron = require('node-cron');
export const CronJobs = async() => {


  //mail ques
  //subscription check

    cron.schedule('* * * * *', () => {
      //check the task report table for unsent
      emailUsers()
      console.log('running a task every minute');
    });


    const updateIsEmailStatus = async()=>{

    }
    

    const emailUsers =async() => {
     
      const taxreports = await Filename.find();
      console.log('test')
    
          try{
                taxreports.forEach(async(taxreport,index) => {
                  if(taxreport.isEmailSent == false){
                  //  console.log(taxreport.user.first_name)

                
                          if(taxreport.period == 12){

                          }else{ //send 6month email
                              console.log('sending mail')
                              // await sixMonthMail( 
                              //   taxreport.user.first_name,
                              //   taxreport.user.email, 
                              //   taxreport.name,
                              //   taxreport.jurisdiction.name,  
                              //   taxreport.created_at.toString(), 
                              //   taxreport.expiration_date.toString()  
                              // )
                              console.log('sent')

                          }
                
                    }else{
                    console.log('no pending mail')
                  }
              }) 
      
          }catch(err){
            console.log(err)
          }
        }
      }
 





