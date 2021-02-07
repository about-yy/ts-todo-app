export interface CrudRepository<Id, Entity>{
    create(entity: Entity): any;
    list(): any;
    find(id: Id): any;
    update(): any;
    delete(): any;
}