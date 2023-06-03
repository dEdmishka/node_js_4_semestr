import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation
} from "typeorm";
import {PostEntity} from "./Post.js";

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column({type: "varchar", unique: true, nullable: false})
    username: string
    @Column({type: "varchar", nullable: false})
    email: string
    @Column({type: "numeric", nullable: false})
    age: number
    @Column({type: "varchar", nullable: true})
    info: string
    @Column("json")
    address: { city: string, street: string }

    @OneToMany('PostEntity','user')

    posts: Relation<PostEntity>[];
}