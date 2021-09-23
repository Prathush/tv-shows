import { Rating } from "./rating";
import { Image } from "./image";

export class Show {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    runTime: number;
    rating: Rating;
    image: Image;
    summary: string;
    officialSite: string;
}