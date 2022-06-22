/**
 * !!! This file is autogenerated do not edit by hand !!!
 *
 * Generated by: @databases/pg-schema-print-types
 * Checksum: KSurSZMcNDITEV2DcnPf/jStbJmxKK42f99Qq8GR9jQF2vbkSwwxrLp3mLKBJ15zY015Ax1p4TzFUHSnwnP+Sw==
 */

/* eslint-disable */
// tslint:disable

import User from './user'

interface Food {
  calories: string
  /**
   * @default nextval('food_id_seq'::regclass)
   */
  id: number & {readonly __brand?: 'food_id'}
  /**
   * @default true
   */
  isActive: (boolean) | null
  name: string
  price: (string) | null
  /**
   * @default now()
   */
  taken_at: (Date) | null
  user_id: (User['id']) | null
}
export default Food;

interface Food_InsertParameters {
  calories: string
  /**
   * @default nextval('food_id_seq'::regclass)
   */
  id?: number & {readonly __brand?: 'food_id'}
  /**
   * @default true
   */
  isActive?: (boolean) | null
  name: string
  price?: (string) | null
  /**
   * @default now()
   */
  taken_at?: (Date) | null
  user_id?: (User['id']) | null
}
export type {Food_InsertParameters}
