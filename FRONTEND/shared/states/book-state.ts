import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddBookOnShoppingCart } from "shared/actions/bookAdd.action";
import { DeleteBookOfShoppingCart } from 'shared/actions/bookDelete.action';
import { Book } from 'shared/models/book.model';
import { BookStateModel } from "./book-state-model";

@State<BookStateModel>({
    name: 'books',
    defaults: {
      booksOnShoppingCart: [],
    },
  })

@Injectable()
export class BookState {
  
  @Selector()
  static getNbBooksOnShoppingCart(state: BookStateModel) {
    return state.booksOnShoppingCart.length;
  }
  @Selector()
  static getListeBooksOnShoppingCart(state: BookStateModel) {
    return state.booksOnShoppingCart;
  }
  @Selector()
    static getTotalPrice(state: BookStateModel){
      let sum: number = 0;
      state.booksOnShoppingCart.forEach(element => {
        sum += element.price;
      });
      return sum;
  }

  @Action(AddBookOnShoppingCart)
  add({ getState, patchState }: StateContext<BookStateModel>,{ book }: AddBookOnShoppingCart) {
    const state = getState();
    patchState({
        booksOnShoppingCart: [...state.booksOnShoppingCart, book],
    });
  }

  @Action(DeleteBookOfShoppingCart)
  delete({ getState, patchState }: StateContext<BookStateModel>,{ book }: DeleteBookOfShoppingCart) {
    const state = getState();
    patchState({
        booksOnShoppingCart: state.booksOnShoppingCart.filter(item => item.reference !== book.reference)
    });
  }
}