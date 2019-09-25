import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class UserDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  public user_id: number

  @Column()
  public name: string

  @Column()
  public age: number

  @Column()
  public greeting: string

  @CreateDateColumn()
  readonly createdAt?: Date

  @UpdateDateColumn()
  readonly updatedAt?: Date

  @Column()
  public delete: boolean = false
}

export default UserDetail
