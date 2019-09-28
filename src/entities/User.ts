import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { Profile } from "./Profile"
import { Post } from "./Post"

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

  @OneToOne(type => Profile)
  @JoinColumn({ name: "profile_id" })
  public profile: Profile

  @OneToMany(type => Post, post => post.user_id)
  public posts: Post[]

  @CreateDateColumn()
  readonly createdAt?: Date

  @UpdateDateColumn()
  readonly updatedAt?: Date

  @Column()
  public delete: boolean = false
}
