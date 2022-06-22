import { IUser } from '../../../../../../Domain/Entities/User'

export class ICreateUserPayload implements Partial<IUser> {
  email?: string;

  dailyCaloriesThreshold?: number;

  name?: string;

  password?: string;

  role?: string;
}
