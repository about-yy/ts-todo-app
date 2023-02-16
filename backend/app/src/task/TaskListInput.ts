import { IsNumber, IsOptional, Min } from "class-validator";

export default class TaskListInput {
    @IsNumber()
    @IsOptional()
    @Min(1)
    limit?: number;
}