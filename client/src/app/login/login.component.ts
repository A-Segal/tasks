import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Validators,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SnackService } from '../services/snack.service';
import { AuthService } from '../services/http/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    snack  = inject(SnackService)
  auth = inject(AuthService); 

  router = inject(Router); 
  route = inject(ActivatedRoute);
  mouseLogin:boolean=false
  mouseoverLogin: boolean = false;
  formGroup:FormGroup={}as FormGroup
  constructor(private formBuilder:FormBuilder){}

  // ngOnInit(){
  // this.formGroup=this.formBuilder.group({
  //   userName:this.formBuilder.control(''),
  //   password:this.formBuilder.control('')
  // })
  // }

 ngOnInit() {
   
    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


// login() {
//   const { userName, password } = this.formGroup.value;
//   localStorage.setItem('user', JSON.stringify({ userName, name: '', role: '', password }));
//   const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/main/tasks';
//   this.router.navigate([returnUrl]);
// }



login() {
     const { userName, password } = this.formGroup.value;
     const username = userName?.trim();
     if(!username || !password){
          this.snack.openSnackBar('שגיאה', 'אנא מלא את כל השדות');
          return;
        }
     this.auth.login$({userName: username, password}).pipe(
      tap((user) =>{ 
        if(user){
          const  { password, ...rest} = user;
          localStorage.setItem('user', JSON.stringify(rest));
          this.router.navigate(['/main']);
        } else{
           this.snack.openSnackBar('לוגין נכשל', 'בדוק תקינות שלשם משתמש או סיסמא')
        }
      })).subscribe();
   
    
  }
 



}
