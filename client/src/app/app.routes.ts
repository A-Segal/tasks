import { Routes } from '@angular/router';
import { LoggedInGuardService } from './services/logged-in-guard.service';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
     {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent)
    },
    {
        path: 'main',
        loadComponent: () =>
          import('./main/main.component').then((m) => m.MainComponent),
         canActivate: [LoggedInGuardService] , 
         children:[
            {
                path: '',
                redirectTo: 'tasks',
                pathMatch: 'full'
            },
            {
                path: 'tasks',
                loadComponent: () =>
                 import('./tasks/tasks.component').then((m) => m.TasksComponent),
            },
            {
                path: 'users',
                loadComponent: () =>
                  import('./users/users.component').then((m) => m.UsersComponent),
                    
            },
            {
                path: 'about',
                loadComponent: () =>
                  import('./about/about.component').then((m) => m.AboutComponent),
                    
            },
         ]
    }
    
];
