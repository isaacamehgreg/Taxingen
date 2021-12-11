import generator from "generate-password"
import { User } from "../User/user.entity"

export const generateCode = async():Promise<string> =>{
  
    const gencode =() =>{
        
          return generator.generate({
                length:8,
                numbers:true,
                lowercase:false,
                
            })

    } 

    let newCode = gencode()

    //check for dublication
    const check =await User.findOne({code : newCode})
    if(check){
       newCode = gencode();
    }

    return newCode;
    
}