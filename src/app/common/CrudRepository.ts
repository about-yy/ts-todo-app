export interface CrudRepository<Entity>{
    create(entity: Entity): any;
    list(): any;
    find(): any;
    update(): any;
    delete(): any;
}