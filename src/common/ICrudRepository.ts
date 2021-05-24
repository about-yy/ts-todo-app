import { DBInterface } from "./DBInterface";

export interface ICrudRepository<T, S>{
    database: DBInterface; 
    create(entity: S): Promise<T>;
    list(offset: number, limit: number): Promise<Array<S>>;
    find(id: T): Promise<S>;
    update(entity: S): Promise<S>;
    delete(entity: S): Promise<boolean>;
}