export interface ICrudService<T, S, U>{
    create(form: S): Promise<U>;
    list(offset: number, limit:number ): Promise<Array<U>>;
    find(id: T): Promise<U>;
    update(id: T, from: S): Promise<U>;
    delete(id: T): Promise<boolean>;
}