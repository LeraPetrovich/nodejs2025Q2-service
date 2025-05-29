import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateNewAlbumTo {
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  @IsOptional()
  @IsString()
  artistId: string | null;
}
