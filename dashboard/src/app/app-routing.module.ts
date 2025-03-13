import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './admin/home/home.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {UnauthorizeComponent} from './pages/unauthorize/unauthorize.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'unauthorized', component: UnauthorizeComponent},
  {path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard],
    data: {expectedRole: 'ROLE_ADMIN'}
  },
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard], data: { expectedRole: 'ROLE_USER' }}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
