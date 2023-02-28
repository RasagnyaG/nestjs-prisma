import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  roll?: string;

  @IsNotEmpty()
  name: string;

  @IsPhoneNumber()
  @IsOptional()
  phone?: string;
}
