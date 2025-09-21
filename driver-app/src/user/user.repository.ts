//driver-app/src/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserRole } from './resources/user.enum';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dtos/user.dto';
import { Body } from '@nestjs/common';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class InMemoryUserRepository {
  private readonly users = new Map<string, User>(); // key = id

  // ---------- CRUD ----------
  async create(createUserDto : CreateUserDto): Promise<User> {
    const id = uuidv4();
    const user: User = {...createUserDto, id };
    this.users.set(id, user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return [...this.users.values()].find(u => u.email === email);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return [...this.users.values()].find(u => u.username === username);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async listAll(): Promise<User[]> {
    return [...this.users.values()];
  }

  async update(updateUserDto : UpdateUserDto): Promise<User | undefined> {
    const updated = await this.users.set(updateUserDto.id, updateUserDto)
    if(updated.get(updateUserDto.id) == undefined){
      throw new Error("Errors updating user")
    }
    return updated.get(updateUserDto.id)
  }
}