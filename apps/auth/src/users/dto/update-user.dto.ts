import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString,
  IsEmail,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({
    message: 'le nom est obligatoire',
  })
  @IsString()
  @MinLength(5, {
    message: 'Le nom doit avoir 5 caractères minimum',
  })
  @MaxLength(50, {
    message: 'Le nom doit avoir 30 caractères maximum',
  })
  lastname: string;

  //

  @IsNotEmpty({
    message: 'le prenom est obligatoire',
  })
  @IsString()
  @MinLength(5, {
    message: 'Le prenom doit avoir 5 caractères minimum',
  })
  @MaxLength(50, {
    message: 'Le prenom doit avoir 30 caractères maximum',
  })
  firstname: string;

  //

  @IsNotEmpty({
    message: 'le password est obligatoire',
  })
  @IsString()
  @MinLength(5, {
    message: 'Le password doit avoir 5 caractères minimum',
  })
  @MaxLength(50, {
    message: 'Le password doit avoir 30 caractères maximum',
  })
  password: string;

  //

  @IsNotEmpty({
    message: 'Le mail est obligatoire',
  })
  @IsEmail({
    message: 'la valeur doit etre un mail',
  })
  email: string;
}
