import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public id: number

  @Column({ unique: true })
  public login: string

  @Column()
  public password: string

  @Column()
  public delete: boolean = false
}
