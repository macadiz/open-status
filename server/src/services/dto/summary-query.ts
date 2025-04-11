import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';

export class SummaryQueryDTO {
  @IsDate()
  @Transform(({ value }) => new Date(value as string))
  startDate: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value as string))
  endDate: Date;
}
