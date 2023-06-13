import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

export class UpdateTaskDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}