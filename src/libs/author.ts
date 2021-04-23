import { IAuthor } from "../interfaces/author";

export const parseAuthors = (response: any): IAuthor[] => {
  const authors: IAuthor[] = [];
  for (const id in response) {
    authors.push(response[id])
  }
  return authors;
}

export const sortAuthor = (authors: IAuthor[]): IAuthor[] => {
  return authors.sort((firstAuthor, secondAuthor) => {
    const first = `${firstAuthor.lastName} ${firstAuthor.firstName}`.toUpperCase();
    const second = `${secondAuthor.lastName} ${secondAuthor.firstName}`.toUpperCase();
    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  })
}
