import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation
} from "typeorm";
import {UserEntity} from "./User.js";

@Entity('posts')
export class PostEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @CreateDateColumn({nullable: false})
    created_at: Date
    @Column({type: "varchar", nullable: false})
    title: string
    @Column({type: "text", nullable: false})
    text: string

    @ManyToOne('UserEntity','posts', {
        cascade: true
    })

    @JoinColumn({
        name: 'user_id',
    })
    // owner: UserEntity;
    user: Relation<UserEntity>;
}