import { Updatable, Whereable } from 'zapatos/schema'

export default interface IEditCrud<Entity extends Updatable, Where extends Whereable> {
  Create(entity : Entity) : Promise<boolean>

  Update(entity : Updatable, query? : Where) : Promise<boolean>
}
