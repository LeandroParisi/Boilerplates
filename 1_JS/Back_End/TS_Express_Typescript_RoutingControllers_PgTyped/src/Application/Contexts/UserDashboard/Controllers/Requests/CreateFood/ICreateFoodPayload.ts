import { IFood } from '../../../../../../Domain/Entities/Food'

export class ICreateFoodPayload implements Partial<IFood> {
calories?: number;

name?: string;

userId?: number;

price?: number;
}
