import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm'
import { User } from "./User"
@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  public profile_id?: number

  @OneToOne(type => User)
  @JoinColumn()
  public user_id: User

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
