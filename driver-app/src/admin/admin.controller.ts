import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from 'src/user/dtos/user.dto';
import { InMemoryUserRepository } from 'src/user/user.repository';
import { Request } from '@nestjs/common';
import { UpdateUserDto } from 'src/user/dtos/updateUser.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: InMemoryUserRepository
  ) {}

//endpoint that uses the user service/repo's create service with auth checking
  @Post()
  create(createUserDto : CreateUserDto, @Req() req: Request) {
    if(!req.body){
      return
    }

    const token = req.body['token']
    if (token.role!="admin" ){
      return
    }
    return this.userService.create(createUserDto)
  }

//handles all field changes for user specified by the dto's "id" field
//can be applied in practice to all users necessary for the admin's ability
  @Patch()
  update(@Body() updateUserDto : UpdateUserDto, @Req() req : Request){
    if(!req.body){
      return
    }

    const token = req.body['token']
    if (token.role!="admin" ){
      return
    }

    return this.userService.update(updateUserDto)
  }
}
