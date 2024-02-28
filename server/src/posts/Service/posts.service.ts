import {HttpException, HttpStatus, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import {Repository} from "typeorm";
import {Post} from "../Model/post.entity";
import {UserEntity} from "../../user/Model/user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PostsService {

  constructor(
      @InjectRepository(Post) private readonly postRepository: Repository<Post>,
      @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  private posts: Post[] = [];

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = new Post();
    post.titulo = createPostDto.titulo;
    post.texto = createPostDto.texto;
    post.dataPost = new Date();

    const user = await this.userRepository.findOne({where: {id: createPostDto.userId }})

    if(!user){
      throw new NotFoundException('User not found.');
    }

    post.user = user

    return this.postRepository.save(user)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.postRepository.findOne({ where: {id} });
  }


  async delete(id: number): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('The post was not found')
    }


    await this.postRepository.remove(post);
    throw new HttpException('Exame deletado com sucesso!', HttpStatus.OK);
  }
}
