import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RecapComponent } from './recap/recap.component';
import { FormService } from './services/form.service';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './bookList/bookList.component';
import { VariablesGlobales } from './variablesGlobales';
import { BookFilterPipe } from './pipes/gender-filter.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { BookState } from 'shared/states/book-state';
import { AdressState } from 'shared/states/adress-state';
import { ConnectFormComponent } from './connect-form/connect-form.component';
import { UserConnectedComponent } from './user-connected/user-connected.component';

const appRoutes: Routes = [
  { path: 'catalogue',
    loadChildren: () => import('./page/page.module'). then(m => m.PageModule)},
  { path: '', component: BookListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    HeaderComponent,
    FooterComponent,
    BookFilterPipe,
    SearchPipe,
    OrderByPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([AdressState, BookState]),
  ],
  providers: [
    FormService,
    VariablesGlobales
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
