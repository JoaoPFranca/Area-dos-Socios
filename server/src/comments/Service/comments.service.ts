import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "../../posts/Model/post.entity";
import {Repository} from "typeorm";
import {UserEntity} from "../../user/Model/user.entity";
import {Comment} from "../Model/comment.entity";

@Injectable()
export class CommentsService {
  constructor(
      @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
      @InjectRepository(Post) private readonly postRepository: Repository<Post>,
      @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = new Comment()
    comment.texto = createCommentDto.texto
    comment.dataComment = new Date()

    const user = await this.userRepository.findOne({where: {email: createCommentDto.user}})
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    comment.user = user

    const post = await this.postRepository.findOne({where: {id: createCommentDto.postId}})
    if (!post) {
      throw new NotFoundException('Post not found.');
    }
    comment.post = post
    post.numberOfComments = post.numberOfComments + 1
    await this.postRepository.save(post)
    return this.commentRepository.save(comment)
  }

  async findAllByPost(postId: number) {
    return this.commentRepository
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user')
        .select(['comment', 'user.username', 'user.email',])
        .orderBy('comment.dataComment', 'DESC')
        .where({ post: await this.postRepository.findOne({where: {id: postId}}) })
        .getMany();
  }

  findOne(id: number) {
    return this.commentRepository.createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user') // Assuming 'user' is the name of the relation in the Post entity
        .select(['comment', 'user.username', 'user.email', /* other user attributes except password */])
        .where({ id: id })
        .getOne();
  }

  async delete(id: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('The comment was not found')
    }


    await this.commentRepository.remove(comment);
    throw new HttpException('Comment successfully deleted!', HttpStatus.OK);
  }
}
