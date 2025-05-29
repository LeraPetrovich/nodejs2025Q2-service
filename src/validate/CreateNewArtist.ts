import { IsString, IsBoolean } from 'class-validator';

export class CreateArtistTo {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
