import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTrack {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  artistId?: string | null;

  @IsOptional()
  @IsString()
  albumId?: string | null;

  @IsNumber()
  duration: number;
}
