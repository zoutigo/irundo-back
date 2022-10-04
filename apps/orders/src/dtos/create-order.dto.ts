import {
  IsBoolean,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsPositive,
  IsString,
  IsPhoneNumber,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty({
    message: 'le nom de la boutique est obligatoire',
  })
  @IsString()
  @MinLength(5, {
    message: 'Le nom doit avoir 5 caractères minimum',
  })
  @MaxLength(50, {
    message: 'Le nom doit avoir 30 caractères maximum',
  })
  name: string;

  @IsNotEmpty({
    message: 'la description de la boutique est obligatoire',
  })
  @IsPositive()
  price: number;

  @IsPhoneNumber('FR', {
    message: "ce numéro de telephone n'est pas français",
  })
  phone: string;
}
