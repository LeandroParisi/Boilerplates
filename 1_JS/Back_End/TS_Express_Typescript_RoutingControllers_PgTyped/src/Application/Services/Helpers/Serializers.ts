/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import StaticImplements from '../../../Commons/Anotations/StaticImplements'
import InternalError from '../../Shared/Abstractions/InternalError'

@StaticImplements()
export class Serializers {
  static CastToCamel<Input, Output>(dbModel : Output | Output[]) : Input | Input[] {
    const isArray = this.IsArray(dbModel)

    if (isArray) return this.KeysToCamel(dbModel) as Input[]

    return this.KeysToCamel(dbModel) as Input
  }

  static CastToSnake<Input, Output>(domainModel : Input | Input[]) : Output | Output[] {
    const isArray = this.IsArray(domainModel)

    if (isArray) return this.KeysToSnake(domainModel) as Output[]

    return this.KeysToSnake(domainModel) as Output
  }

  private static KeysToCamel(o : any) {
    try {
      if (Serializers.IsDate(o)) {
        return o
      }
      if (Serializers.IsObject(o)) {
        const n = {}

        Object.keys(o)
          .forEach((k) => {
            n[Serializers.ToCamel(k)] = Serializers.KeysToCamel(o[k])
          })

        return n
      } if (Serializers.IsArray(o)) {
        return o.map((i) => Serializers.KeysToCamel(i))
      }
      return o
    } catch (error) {
      throw new InternalError('Unable to parse db object to Domain object: Serializers.KeysToCamel', error)
    }
  }

  private static KeysToSnake(o : any) {
    try {
      if (Serializers.IsDate(o)) {
        return o
      }
      if (Serializers.IsObject(o)) {
        const n = {}

        Object.keys(o)
          .forEach((k) => {
            n[Serializers.ToSnake(k)] = Serializers.KeysToSnake(o[k])
          })

        return n
      } if (Serializers.IsArray(o)) {
        return o.map((i) => Serializers.KeysToSnake(i))
      }
      return o
    } catch (error) {
      throw new InternalError('Unable to parse db object to Domain object: Serializers.KeysToSnake', error)
    }
  }

  private static ToSnake = (s : any) => s.replace(/[A-Z]/g, (letter : string) => `_${letter.toLowerCase()}`);

  private static ToCamel = (s : any) => s.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
    .replace('-', '')
    .replace('_', ''));

  private static IsArray(t : any) {
    return Array.isArray(t)
  }

  private static IsDate(t : any) {
    return t instanceof Date
  }

  private static IsObject(o : any) {
    return o === Object(o) && !Serializers.IsArray(o) && typeof o !== 'function'
  }
}
