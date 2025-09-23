//driver-app/src/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserRole } from './resources/user.enum';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dtos/user.dto';
import { Body } from '@nestjs/common';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

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

  async update(updateUserDto: UpdateUserDto): Promise<User | undefined> {
  const id = updateUserDto.id;
  if (!id) {
    throw new BadRequestException('id is required to update a user');
  }

  const existing = this.users.get(id);
  if (!existing) {
    throw new NotFoundException('User not found');
  }

  const { id: _, ...rest } = updateUserDto;
  const patch = Object.fromEntries(
    Object.entries(rest).filter(([, v]) => v !== undefined)
  ) as Partial<User>;

  const updated: User = { ...existing, ...patch, id };

  this.users.set(id, updated);
  return updated;
}
}