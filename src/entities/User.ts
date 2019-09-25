import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public user_id: number

  @Column({ unique: true })
  public email: string

  @Column()
  public password: string

  @Column()
  public token: string

  @CreateDateColumn()
  readonly createdAt?: Date

  @UpdateDateColumn()
  readonly updatedAt?: Date

  @Column()
  public delete: boolean = false
}
