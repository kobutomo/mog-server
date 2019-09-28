import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm'
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn("increment")
	readonly post_id?: number

	@ManyToOne(type => User)
	@JoinColumn({ name: "user_id" })
	public user_id: User

	@Column()
	public title: string

	// @Column()
	// public content: string

	// @Column("text", { array: true })
	// public images: string[]

	// @Column()
	// public rating: number

	// @Column("text", { array: true })
	// public tags: string[]

	// @Column("text")
	// public location: string

	// @Column("text")
	// public location_search: string

	@CreateDateColumn()
	readonly createdAt?: Date

	@UpdateDateColumn()
	readonly updatedAt?: Date

	@Column()
	public delete: boolean = false
}
