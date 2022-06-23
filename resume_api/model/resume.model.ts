import { Table, Column, Model, HasMany } from 'sequelize-typescript'

@Table
export class Resume extends Model {

  @Column
  name: string

  @Column
  contact: string

  @Column
  description: string;

}