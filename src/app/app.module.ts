import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

/// Components
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { TypificationComponent } from './components/typification/typification-selector/typification.component';
import { TypifyComponent } from './components/typification/typify/typify.component';
import { TypifyFormComponent } from './components/typification/typify/typify-form/typify-form.component';
import { PdfNavigatorComponent } from './components/shared/pdf-navigator/pdf-navigator.component';

/// Inerceptores
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { AuthService } from './services/authentication/auth.service';
import { JwtInterceptor } from './services/interceptors/jwt.interceptor';

/// Modules
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// RECOMMENDED (doesn't work with system.js)
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';

/// Services
import { TypificationService } from './services/typification/typification.service';

/// External components
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ValidationSelectorComponent } from './components/validation/validation-selector/validation-selector.component';
import { ValidationService } from './services/typification/validation.service';
import { ValidateComponent } from './components/validation/validate/validate.component';
import { ValidateFormComponent } from './components/validation/validate/validate-form/validate-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    TypificationComponent,
    TypifyComponent,
    TypifyFormComponent,
    PdfNavigatorComponent,
    ValidationSelectorComponent,
    ValidateComponent,
    ValidateFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    PdfViewerModule,
    FormsModule,
    ProgressbarModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthService,
    TypificationService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
