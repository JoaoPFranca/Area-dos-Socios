import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/Model/user.entity";

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

    @ManyToOne(() => UserEntity, user => user.posts)
    user: UserEntity;
}
