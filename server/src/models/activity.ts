import { IsNumber, IsString, Length, Max, Min } from "class-validator";

export class Activity{
    @IsString()
    @Length(1)
      activity!: string;
      
    @IsNumber()
    @Min(0.0)
    @Max(1.0)
      accessibility!: number;
    
    @IsString()
    @Length(1)
      type!: string;

    @IsNumber()
    @Min(0)
      participants!: number;

    @IsNumber()
    @Min(0)
    @Max(1)
      price!: number;

    @IsString()
      link!: string;

    @IsString()
      key!: string;
}