import { Expose, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class TaskUpdateInput {

    @IsNotEmpty()
    @IsNumber()
    taskId: number;

    @IsNotEmpty()
    @IsString()
    @Expose({name: "title"})
    taskName: string;

    @IsDate()
    @Type(()=>Date)
    period: Date;
}