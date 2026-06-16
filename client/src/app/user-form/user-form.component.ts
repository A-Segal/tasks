import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SnackService } from '../services/snack.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { UsersService } from '../services/http/user.service';
import { RoleEnum } from '../Model/role';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule, 
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit{
  private fb = inject(FormBuilder);   
  private usersService = inject(UsersService); 
  private snack = inject(SnackService);
  userForm: FormGroup = {} as FormGroup;   
  theRoleEnum = RoleEnum;
  currentUserRole: number = RoleEnum.standard;
  availableRoles: any[] = [];
  
  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data?.currentUserRole){
      this.currentUserRole = data.currentUserRole;
    }
  }

  ngOnInit(): void {
    this.setAvailableRoles();
    
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\-]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      roleId: new FormControl(RoleEnum.standard) 
    });
  }

  setAvailableRoles(): void {
    // Manager can add both manager and standard users
    if(this.currentUserRole === RoleEnum.manager){
      this.availableRoles = [
        { id: RoleEnum.manager, name: 'מנהל' },
        { id: RoleEnum.standard, name: 'משתמש רגיל' }
      ];
    } else {
      // Regular user can only add regular users
      this.availableRoles = [
        { id: RoleEnum.standard, name: 'משתמש רגיל' }
      ];
    }
  }

  save() {
   
      const user = this.userForm.value;
      this.usersService.addUser$(user).pipe(
        tap((result) =>  this.dialogRef.close({ success: true }))
      ).subscribe(
        (_=>  this.snack.openSnackBar('עבר בהצלחה','משתמש חדש התווסף')),
        (err => this.snack.openSnackBar('שגיאה בהוספת משתמש',err))
      );   
      
  
  }

  cancel(){
      this.dialogRef.close({ success: true });
  }

  
}

