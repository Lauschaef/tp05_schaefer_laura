import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Book } from '../../../shared/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  booksSubject = new Subject<any[]>();
  bookSubject = new Subject<Book>();
  books: Book[] = [];
  book: Book = new Book;

  emitBooks(){
    this.booksSubject.next(this.books);
  }

  getBooks(){
    this.getJSON().subscribe(
      (response) => {
        this.books = response;
        this.emitBooks();
      },
      (error) => {
        console.log("erreur : " + error);
      }
    )
  }

  emitBook(){
    this.bookSubject.next(this.book);
  }

  getBookByReference(ref: string) {
    this.getJSON().subscribe(
      (response) => {
        response.find(
          (s) => {
            if(s.reference === ref){
              this.book = s;
            };
          }
        );
        this.emitBook();
      },
      (error) => {
        console.log("erreur : " + error);
      }
    )
  }

  constructor(private http:HttpClient) { }

  public getJSON(): Observable<Book[]> {
    return this.http.get<Book[]>("../assets/books.json");
  }
}
