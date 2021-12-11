import { ErrorResponseFilter } from "src/utils/error-response.filter";
import { forbiddenError } from "../../utils/exceptions";
import { Category } from "../categories.entities"


export const addCat =async (name: string):Promise<any>=>{
   const newCat =  Category.create({ name});
   if(!newCat){
       throw forbiddenError("failed to create category");
   }
   return newCat;

}