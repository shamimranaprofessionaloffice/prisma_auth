import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  isString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Shamim Rana' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'shamim@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6, example: '123456' })
  @MinLength(6)
  password: string;
}

export class loginDTO {
  @ApiProperty({ example: 'shamim@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6, example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;
}
