import { validate, ValidationError } from "class-validator";
import { HttpsError } from "./http-error";

export default class Validator {
    static async classValidate(target: any){
        const errors = await validate(target);
        if(errors.length > 0 ){
            throw new HttpsError("invalid-argument", "invalid argument", this.formatClassValidateErrors(errors));
        }
    }

    private static formatClassValidateErrors(errors: ValidationError[]){
        const formated = errors.map((error: ValidationError)=>{
            return {
                property: error.property, 
                value: error.value,
                constraints: error.constraints
            };
        });
        return formated;
    }
}