import { Book } from '../models/book.model';

export class DeleteBookOfShoppingCart {
  static readonly type = '[Book] Delete';

  constructor(public book: Book) {}
}