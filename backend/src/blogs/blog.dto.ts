import { IsInt, Min, Max } from 'class-validator';

export class CreateBookingDto{

    @IsInt()
    @Min(1)
    @Max(5)
    couunt:number
}