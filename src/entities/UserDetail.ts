import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User_Detail extends BaseEntity {
  @PrimaryGeneratedColumn()
  public user_id: string

  @Column()
  public name: string

  @Column()
  public age: number

  @Column({ unique: true })
  public email: string

  @Column()
  public greeting: string
}

export default User_Detail
