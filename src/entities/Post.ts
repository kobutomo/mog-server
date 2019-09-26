import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'

@Entity()
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly user_id: number

	@Column("increment")
	public post_id?: number

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
