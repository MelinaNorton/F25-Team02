import { IsString, IsEnum, IsNumber, IsBoolean } from 'class-validator';
import { UserRole } from '../resources/user.enum';

//user dto

export class CreateUserDto {

    @IsString()
      id: string;  
      
    @IsString()
      username: string;

    @IsString()
      passwordHash: string; 
      
    @IsString()
      name: string;

    @IsEnum(UserRole)
      role: UserRole;

    @IsString()
      bio?: string;

    @IsString()
      address?: string;

    @IsString()
      email: string;

    @IsString()
      phone?: string;

    @IsString()
      profilePicUrl?: string;

    @IsString()
      backupEmail?: string;

    @IsString()
      securityQuestion?: string;

    @IsString()
      securityQuestionAnswer?: string;

    @IsNumber()
      points: number;

    @IsBoolean()
      archived: boolean;
}