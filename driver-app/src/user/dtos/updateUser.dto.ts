import { IsString, IsEnum, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { UserRole } from '../resources/user.enum';

export class UpdateUserDto {

    @IsOptional()
    @IsString()
      id: string;  
    
    @IsOptional()
    @IsString()
      username?: string;

    @IsOptional()
    @IsString()
      passwordHash?: string; 

    @IsOptional()
    @IsString()
      name?: string;

    @IsOptional()
    @IsEnum(UserRole)
      role?: UserRole;

    @IsOptional()
    @IsString()
      bio?: string;

    @IsOptional()
    @IsString()
      address?: string;

    @IsOptional()
    @IsString()
      email?: string;

    @IsOptional()
    @IsString()
      phone?: string;

    @IsOptional()
    @IsString()
      profilePicUrl?: string;

    @IsOptional()
    @IsString()
      backupEmail?: string;

    @IsOptional()
    @IsString()
      securityQuestion?: string;

    @IsOptional()
    @IsString()
      securityQuestionAnswer?: string;

    @IsOptional()
    @IsNumber()
      points?: number;

    @IsOptional()
    @IsBoolean()
      archived?: boolean;
}