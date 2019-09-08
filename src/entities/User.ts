import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string

  @Column({ unique: true })
  public login: string

  @Column()
  public password: string
}

export default User
