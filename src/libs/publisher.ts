import { IPublisher } from "../interfaces/publisher";

export const parsePublishers = (response: any): IPublisher[] => {
  const publishers: IPublisher[] = [];
  for (const id in response) {
    publishers.push(response[id])
  }
  return publishers;
}

export const sortPublisher = (publishers: IPublisher[]): IPublisher[] => {
  return publishers.sort((firstPublisher, secondPublisher) => {
    const first = firstPublisher.name.toUpperCase();
    const second = secondPublisher.name.toUpperCase();
    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  })
}