import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { LoginComponent } from './components/login/login.component';
// import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeComponent } from '../../components/home/home.component';
import { AuthGuard } from '../../guards/auth.guard';
import { TypificationComponent } from '../../components/typification/typification-selector/typification.component';
import { TypifyComponent } from '../../components/typification/typify/typify.component';
import { ValidationSelectorComponent } from '../../components/validation/validation-selector/validation-selector.component';
import { ValidateComponent } from '../../components/validation/validate/validate.component';


const appRoutes: Routes = [
    // { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'validation', component: ValidationSelectorComponent, canActivate: [AuthGuard] },
    { path: 'typification', component: TypificationComponent, canActivate: [AuthGuard] },
    { path: 'typify/:productId', component: TypifyComponent, canActivate: [AuthGuard] },
    { path: 'validate/:productId', component: ValidateComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
      RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard
  ],
  exports: [
      RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
