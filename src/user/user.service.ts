import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './user.models';

@Injectable()
export class UserService {
  private users: Users[] = [];

  // 회원가입
  async create(@Body() createUserDto: CreateUserDto) {
    const { userId, userPw, userName } = createUserDto;

    if (this.users.find((user) => user.userId === userId)) {
      throw new BadRequestException('User is already exist');
    }
    //없으면 리스트에 유저 정보 추가
    const user: Users = {
      userId,
      userPw,
      userName,
    };
    this.users.push(user);
    return 'This action adds a new user';
  }

  // 전체 유저 검색
  async findAll() {
    return this.users;
  }

  // 해당 유저 검색
  findOne(userId: string) {
    console.log(userId);
    return this.users.find((user) => user.userId === userId);
  }

  // 해당 유저 정보 수정
  update(id: string, updateUserDto: UpdateUserDto) {
    const { userId, userName } = updateUserDto;
    const user = this.users.find((user) => user.userId === id);
    if (!user) {
      throw new BadRequestException('User Not Exist');
    }
    // 해당 유저 정보 제거 후
    this.users = this.users.filter((user) => user.userId !== id);
    console.log(this.users);
    user.userId = userId;
    user.userName = userName;
    this.users.push(user);
    console.log('게시글 수정 완료');
  }

  remove(userId: string) {
    if (!this.users.find((user) => user.userId === userId)) {
      throw new BadRequestException('User Not Exist');
    }
    this.users = this.users.filter((user) => user.userId !== userId);
    console.log('삭제 완료');
  }
}
