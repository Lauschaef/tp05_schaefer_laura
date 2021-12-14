import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesGlobales } from '../variablesGlobales';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BookState } from 'shared/states/book-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Select(BookState.getNbBooksOnShoppingCart) nb$: Observable<number> | undefined;

  constructor(private router: Router, public param: VariablesGlobales) { }

  ngOnInit(): void {}

}
