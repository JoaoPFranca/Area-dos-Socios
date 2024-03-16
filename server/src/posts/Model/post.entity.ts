import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/Model/user.entity";
import {Comment} from "../../comments/Model/comment.entity";

@Entity("post")
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    texto: string;

    @Column()
    dataPost: Date;

    @Column()
    numberOfComments: number;

    @ManyToOne(() => UserEntity, user => user.posts)
    user: UserEntity;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
}
