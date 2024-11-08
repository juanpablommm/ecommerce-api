import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { ProductListComponent } from './product/product-list/product-list.component';



export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: UserCreateComponent},
    {path: 'home', component: ProductListComponent},
    
];
