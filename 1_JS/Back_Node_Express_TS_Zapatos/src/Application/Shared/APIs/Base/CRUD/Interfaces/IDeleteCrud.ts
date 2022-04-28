import { Whereable } from 'zapatos/schema'

export default interface IDeleteCrud<Where extends Whereable> {
  Delete(query : Where) : Promise<boolean>

  Activate(query : Where) : Promise<boolean>

  Deactivate(query : Where) : Promise<boolean>
}
