import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { User } from '../models/user.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddAdress } from 'shared/actions/adressAdd.action';
import { DeleteAdress } from 'shared/actions/adressDelete.action';
import { AdressState } from 'shared/states/adress-state';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {

  user : User = new User("","","","","","","","","","","");
  adresses : Observable<string>;
  adressForm: FormGroup  = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private formService: FormService, private store : Store) { 
    this.adresses = this.store.select(state => state.adresses.adresses);
    this.adressForm = this.formBuilder.group({
      adress: ''
    });
  }

  @Select(AdressState.getAdresses) adresses$: Observable<string[]> | undefined;

  addAdress(){
    let adress: string = this.adressForm.value['adress'];
    this.store.dispatch(new AddAdress(adress));

    this.adressForm = this.formBuilder.group({
      adress: ''
    });

  }

  deleteAdress(adress: string){
    this.store.dispatch(new DeleteAdress(adress));
  }

  ngOnInit(): void {
    this.user = this.formService.user;
  }

}
