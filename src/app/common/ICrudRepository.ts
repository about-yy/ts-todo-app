export interface ICrudRepository<T, S>{
    create(S: S): Promise<T>;
    list(offset: number, limit: number): Promise<Array<S>>;
    find(T: T): Promise<S>;
    update(S: S): Promise<S>;
    delete(S: S): Promise<boolean>;
}