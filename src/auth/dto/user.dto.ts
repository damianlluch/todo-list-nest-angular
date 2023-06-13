import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class LoginDto {
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;
}
