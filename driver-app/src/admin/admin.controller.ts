import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from 'src/user/dtos/user.dto';
import { InMemoryUserRepository } from 'src/user/user.repository';
import { Request } from '@nestjs/common';

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

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, ) {
    //return this.adminService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
