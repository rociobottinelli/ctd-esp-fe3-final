export interface IComicResponse {
    code: number | string;
    message: string;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: {
      offset: number;
      limit: number;
      total: number;
      count: number;
      results: IComic[];
    };
  }
  
  export interface IComic {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: string | null;
    modified: string;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    thumbnail: {
      path: string;
      extension: string;
    };
    series: {
      resourceURI: string;
      name: string;
    };
    stock: number;
    oldPrice: number;
    price: number;
    creators: {
      available: number;
      collectionURI: string;
      items: [
        {
          resourceURI: string;
          name: string;
          role: string;
        }
      ];
      returned: number;
    };
    characters: {
      available: number;
      collectionURI: string;
      items: [
        {
          resourceURI: string;
          name: string;
          role: string;
        }
      ];
      returned: number;
    };
  }


export interface ICharacterResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: ICharacter[];
  };
}

export interface ICharacter {
  id: number;
  name: string;
  description: string | null;
  modified: Date;
  resourceURI: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
export type ICheckout = {
  customer: ICustomer;
  card: ICard;
  order: IOrder;
};

export interface ICard {
  number: string;
  cvc: string;
  expDate: string;
  nameOnCard: string;
}

export interface IOrder {
  name: string;
  image: string;
  price: number;
}

export interface IAddress {
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zipCode: string;
}

export interface ICustomer {
  name: string;
  lastname: string;
  email: string;
  address: IAddress;
}
