import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { UsersService } from '../services/http/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SnackService } from '../services/snack.service';
import { iuser } from '../Model/iuser';
import { map, NEVER, Observable, tap } from 'rxjs';
import { RoleEnum } from '../Model/role';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-users',
   imports:[
     CommonModule,
     MatButton,
    MatIconModule,
    MatTableModule,
    
   ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit  {
   private usersService = inject(UsersService); 
   private dialog = inject(MatDialog);
   private dialogRef: MatDialogRef<UserFormComponent> | null = null;
   private confirmRef: MatDialogRef<ConfirmDialogComponent> | null = null;
   private snack = inject(SnackService);
   usersList :iuser[] | null= [];
   user:iuser = {} as iuser;
   columns: string[] = []; 
   notDisplayColumns: string[] =  [];  
   iconColumns = ['delete']; 
   theRole = RoleEnum
 
   ngOnInit(): void {
     
     const details = localStorage.getItem('user');
   
    if(details){
      this.user = JSON.parse(details);
      if(this.user.roleId !== RoleEnum.manager){
        this.notDisplayColumns = ['password']
      }
      this.loadUsers()
    }
   }   
  
  loadUsers(){
        this.usersService.getUsers$().pipe(
          map(users => users || []),
          tap(users => {
            console.log('Loaded users:', users);
            this.usersList = users;
          }),
          tap(users => {
            if(users && users.length){
              this.columns =[... Object.keys(users[0]),'delete']
                .filter(col=> !this.notDisplayColumns.includes(col));
            }
          })
        ).subscribe();
    }

  deleteUser(user: any){
    // Do NOT coerce to Number here: backend may use string IDs for newly created users
    const userIdRaw = user.userId ?? user.id ?? user.userID ?? user.ID;
    console.log('Delete clicked for user (raw id):', userIdRaw, user);

    if(userIdRaw === null || userIdRaw === undefined || userIdRaw === ''){
      this.snack.openSnackBar('שגיאה','לא ניתן למחוק את המשתמש - מזהה חסר');
      return;
    }

    this.confirmRef = this.dialog.open(ConfirmDialogComponent, {
      width: '220px',
      disableClose: false,
        data: { message: 'האם אתה בטוח שאתה רוצה למחוק את המשתמש?'}
    });

    this.confirmRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      if(result){
          this.deleteUserFromList(userIdRaw);
      }
      this.confirmRef = null;
    });
  }

  deleteUserFromList(userId: any){
      console.log('Deleting user ID (raw):', userId);
      this.usersService.deleteUser$(userId).pipe(
            tap((result) => {
              console.log('Delete response from server:', result);
              this.snack.openSnackBar('מחיקה הסתיימה בהצלחה','');
              this.loadUsers();
            })
          ).subscribe(
            (_=>{}),
            (err => {
              console.error('Delete error:', err);
              this.snack.openSnackBar('שגיאה במחיקת משתמש',err?.error?.message || err?.message || err);
            })
        );  
  }
  inspectUser(user: any){
    console.log('Inspect user row:', user);
    const id = user.userId ?? user.id ?? user.userID ?? user.ID ?? null;
    console.log('Extracted id:', id);
    this.snack.openSnackBar('Inspect id', id == null ? 'none' : String(id));
  }

  addUser(){
     this.dialogRef = this.dialog.open(UserFormComponent, {
          width: '520px',
          disableClose: false,
            data: { task: null, currentUserRole: this.user?.roleId }
        });
    
        this.dialogRef.afterClosed().subscribe(result => {
          console.log('Dialog closed', result);
          if(result?.success){
            this.loadUsers();
          }
          this.dialogRef = null; // אחרי הסגירה מאפסים את ההפניה
        });
  }
}
