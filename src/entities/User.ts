import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public id: number

  @Column({ unique: true })
  public email: string

  @Column()
  public password: string

  @Column()
  public token: string

  @Column()
  public delete: boolean = false
}
