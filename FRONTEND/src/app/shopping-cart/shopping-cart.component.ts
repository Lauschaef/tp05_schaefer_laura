import { Component, OnInit } from '@angular/core';
import { BookState } from 'shared/states/book-state';
import { BooksService } from '../services/books.service';
import { Book } from '../../../shared/models/book.model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { DeleteBookOfShoppingCart } from 'shared/actions/bookDelete.action';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

booksOnShoppingCart : Observable<Book>;

  constructor(private store : Store) {
    this.booksOnShoppingCart = this.store.select(state => state.booksOnShoppingCart.booksOnShoppingCart);
  }

  @Select(BookState.getListeBooksOnShoppingCart) liste$: Observable<Book[]> | undefined;
  @Select(BookState.getTotalPrice) total$: Observable<number> | undefined;

  deleteBookOfShoppingCart(book: Book){
    this.store.dispatch(new DeleteBookOfShoppingCart(book));
    console.log("delete");
  }

  ngOnInit(): void {
  }

}
