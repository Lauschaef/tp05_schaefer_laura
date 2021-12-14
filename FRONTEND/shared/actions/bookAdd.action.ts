import { Book } from '../models/book.model';

export class AddBookOnShoppingCart {
  static readonly type = '[Book] Add';

  constructor(public book: Book) {}
}