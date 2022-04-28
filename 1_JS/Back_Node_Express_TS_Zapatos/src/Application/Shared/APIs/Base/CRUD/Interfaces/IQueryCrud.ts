import { Selectable, Whereable } from 'zapatos/schema'

export default interface IQueryCrud<Entity extends Selectable, Where extends Whereable> {
  FindAll(query? : Where) : Promise<Entity[]>

  FindOne(query? : Where) : Promise<Entity>

  FindByPk(id : string | number) : Promise<Entity>
}
