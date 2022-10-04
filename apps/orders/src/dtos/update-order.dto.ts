import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsPositive,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsNotEmpty({
    message: 'le nom de la boutique est obligatoire',
  })
  @MinLength(5, {
    message: 'Le nom doit avoir 5 caractères minimum',
  })
  @MaxLength(50, {
    message: 'Le nom doit avoir 30 caractères maximum',
  })
  name: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'la description de la boutique est obligatoire',
  })
  @IsPositive()
  price: number;

  @IsOptional()
  @IsPhoneNumber('FR', {
    message: "ce numéro de telephone n'est pas français",
  })
  phone: string;
}
