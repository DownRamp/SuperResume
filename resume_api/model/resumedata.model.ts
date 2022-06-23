import { Table, Column, Model, HasMany } from 'sequelize-typescript'

@Table
export class ResumeData extends Model {

  @Column
  resume_id: number

  @Column
  title: string

  @Column
  type: string;

  @Column
  date: string;

  @Column
  description: string;
}