export interface ICrudRepository<T, S>{
    create(entity: S): Promise<T>;
    list(offset: number, limit: number): Promise<Array<S>>;
    find(id: T): Promise<S>;
    update(entity: S): Promise<S>;
    delete(entity: S): Promise<boolean>;
}