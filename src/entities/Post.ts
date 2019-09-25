import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("increment")
	readonly post_id?: number

	@Column()
	public user_id: number

	@Column()
	public title: string

	@Column()
	public content: string

	@Column()
	public images: string[]

	@Column()
	public rating: number

	@Column()
	public tags: string[]

	@CreateDateColumn()
	readonly createdAt?: Date

	@UpdateDateColumn()
	readonly updatedAt?: Date

	@Column()
	public delete: boolean = false
}
