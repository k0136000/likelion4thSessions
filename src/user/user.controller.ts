import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // 모든 회원 정보 검색
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // 해당 회원 정보 검색
  @Get('getOne/:userId')
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  // 해당 회원 정보 업데이트
  @Patch('updateOne/:userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  // 해당 회원 정보 삭제
  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.userService.remove(userId);
  }
}
