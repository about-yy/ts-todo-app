export interface CrudRepositoryInterface<Id, Entity>{
    create(entity: Entity): Promise<Id>;
    list(offset: number, limit: number): Promise<Array<Entity>>;
    find(id: Id): Promise<Entity>;
    update(entity: Entity): Promise<Entity>;
    delete(entity: Entity): Promise<boolean>;
}