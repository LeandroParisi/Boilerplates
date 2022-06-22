import { ConnectionPool } from '@databases/pg'

export type IdType = number | string
export interface IBaseRepository<Entity> {
  Create(model: any, connection? : ConnectionPool): Promise<Entity>;
  UpdateOne(query: any, model: any, connection? : ConnectionPool): Promise<boolean>;
  Delete(query: any, connection? : ConnectionPool): Promise<void>;
  FindOne(query: any, connection? : ConnectionPool): Promise<Entity>;
  FindAll(query: any, connection? : ConnectionPool): Promise<Entity[]>;
}
