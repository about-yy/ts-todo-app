import { ICrudRepository } from "./ICrudRepository";

export interface ICrudService<T, S>{
    repository: ICrudRepository<T, S>;

    create(task: S): Promise<T>;
    list(offset: number, limit:number ): Promise<Array<S>>;
    find(id: T): Promise<S>;
    update(entity: S): Promise<S>;
    delete(entity: S): Promise<boolean>;
}