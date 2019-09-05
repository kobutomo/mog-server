import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number = 0

  @Column()
  public name: string = ''

  @Column()
  public age: number = 0

  @Column()
  public gender: string = ''
}

export default User
