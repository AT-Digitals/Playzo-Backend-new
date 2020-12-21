import {
    Allow,
} from "class-validator";

export class AdminPropertyAmenitiesRequestDto {
    @Allow()
    amenities: string[]
}