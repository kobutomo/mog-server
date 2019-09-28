import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm'
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn("increment")
	readonly post_id?: number

	@OneToOne(type => User)
	@JoinColumn()
	public user_id: User

	@Column()
	public title: string

	@Column()
	public content: string

	@Column("text", { array: true })
	public images: string[]

	@Column()
	public rating: number

	@Column("text", { array: true })
	public tags: string[]

	@CreateDateColumn()
	readonly createdAt?: Date

	@UpdateDateColumn()
	readonly updatedAt?: Date

	@Column()
	public delete: boolean = false
}
