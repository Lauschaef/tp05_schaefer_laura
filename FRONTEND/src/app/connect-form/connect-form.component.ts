import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiLoginService } from '../services/api-login.service';

@Component({
  selector: 'app-connect-form',
  templateUrl: './connect-form.component.html',
  styleUrls: ['./connect-form.component.css']
})
export class ConnectFormComponent implements OnInit {

  connectForm : FormGroup = new FormGroup({});

  constructor(private formbuilder: FormBuilder, private router: Router, private api:ApiLoginService) { }

  ngOnInit(): void {
    this.connectForm = this.formbuilder.group({
      login : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  onSubmit(){
    const login = this.connectForm.get('login')?.value;
    const password = this.connectForm.get('password')?.value;

    this.api.PostLogin(login, password).subscribe(
      (data)=>{
        this.router.navigate(["/catalogue/connecte"]);
      },
      (error)=>{
        this.router.navigate(["/catalogue/formulaire"]);
      }
    );
    
  }

}
