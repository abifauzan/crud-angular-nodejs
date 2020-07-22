import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FrontendComponent } from './frontend/frontend.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductAddComponent } from './product-add/product-add.component';

import { AuthGuard } from './shared/auth.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'product/add',
        component: ProductAddComponent
      },
      {
        path: 'product/:slug',
        component: ProductEditComponent
      }
    ]
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '', component: FrontendComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
