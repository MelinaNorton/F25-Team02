//driver-app/src/auth/auth.servics.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InMemoryUserRepository } from '../user/user.repository';
import { User } from 'src/user/interfaces/user.interface';
import { UserRole } from 'src/user/resources/user.enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/user.dto';
import { RegisterDto } from './auth.controller';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: InMemoryUserRepository,
    private readonly jwt: JwtService,
  ) {}

  // ---------- Registration ----------
  async register(registerDto : RegisterDto): Promise<User> {
    // enforce unique username/email
    let createUserDto = new CreateUserDto()
    createUserDto.username = registerDto.username;
    createUserDto.email = registerDto.email;
    createUserDto.name = registerDto.name;
    createUserDto.role = registerDto.role;
   
    if (await this.usersRepo.findByUsername(createUserDto.username)) {
      throw new ConflictException('Username already taken');
    }
    if (await this.usersRepo.findByEmail(createUserDto.email)) {
      throw new ConflictException('Email already registered');
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(registerDto.password, salt);
    createUserDto.points = 0;
    createUserDto.archived = false;
    createUserDto.passwordHash = passwordHash;

    const user = await this.usersRepo.create(createUserDto);

    return user;
  }

  // ---------- Login ----------
  async validateCredentials(username: string, password: string): Promise<User> {
    const user = await this.usersRepo.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    if (user.archived) throw new UnauthorizedException('Account archived');

    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, role: user.role };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}