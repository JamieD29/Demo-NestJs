import { MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(5)
  name: string;
  power: string;
  league: string;
}
