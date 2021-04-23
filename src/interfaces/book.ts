import { IAuthor } from "./author";
import { IPublisher } from "./publisher";

export interface IBook {
  id?: number;
  title: string;
  isbn: number;
  publishmentYear: number;
  authorId: number;
  publisherId: number;
  author?: IAuthor;
  authorLabel?: string;
  publisher?: IPublisher;
  publisherLabel?: string;
}
