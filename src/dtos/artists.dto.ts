import { IsString, IsDecimal, isNumber, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsDecimal()
  public rate: number;

  @IsInt()
  public streams: number;
}