import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "../../posts/Model/post.entity";
import {UserEntity} from "../../user/Model/user.entity";

@Entity("comment")
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    texto: string;

    @Column()
    dataComment: Date;

    @ManyToOne(() => UserEntity, user => user.posts)
    user: UserEntity;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;
}
