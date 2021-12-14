import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddAdress } from 'shared/actions/adressAdd.action';
import { DeleteAdress } from 'shared/actions/adressDelete.action';
import { AdressStateModel } from './adress-state-model';

@State<AdressStateModel>({
    name: 'adresses',
    defaults: {
      adresses: [],
    },
  })

@Injectable()
export class AdressState {
  
  @Selector()
  static getAdresses(state: AdressStateModel) {
    return state.adresses;
  }

  @Action(AddAdress)
  add({ getState, patchState }: StateContext<AdressStateModel>,{ adress }: AddAdress) {
    const state = getState();
    patchState({
        adresses: [...state.adresses, adress],
    });
  }

  @Action(DeleteAdress)
  delete({ getState, patchState }: StateContext<AdressStateModel>,{ adress }: DeleteAdress) {
    const state = getState();
    patchState({
        adresses: state.adresses.filter(item => item !== adress)
    });
  }
}