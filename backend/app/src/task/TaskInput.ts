import { Expose, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import "reflect-metadata";

export default class TaskInput {
    @IsNotEmpty()
    @IsString()
    @Expose({name: "title"})
    taskName: string;

    @Type(()=>Date)
    @IsDate()
    period: Date;
}