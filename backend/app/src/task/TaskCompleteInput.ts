import { IsNotEmpty, IsNumber } from "class-validator";

export default class TaskCompleteInput {
    @IsNotEmpty()
    @IsNumber()
    taskId: number;
}