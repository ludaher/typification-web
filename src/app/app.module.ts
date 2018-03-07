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
import { CookieService } from 'ngx-cookie-service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// RECOMMENDED (doesn't work with system.js)
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';

/// Services
import { TypificationService } from './services/typification/typification.service';

/// External components
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ValidationSelectorComponent } from './components/validation/validation-selector/validation-selector.component';
import { ValidationService } from './services/typification/validation.service';
import { ValidateComponent } from './components/validation/validate/validate.component';
import { ValidateFormComponent } from './components/validation/validate/validate-form/validate-form.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { PagerComponent } from './components/shared/pager/pager.component';
import { ProductsService } from './services/admin/products.service';
import { PagingUtil } from './services/utilities/pagingUtil';
import { ProductListComponent } from './components/admin/products/product-list/product-list.component';
import { ProductDetailComponent } from './components/admin/products/product-detail/product-detail.component';
import { DocumentalTypesService } from './services/admin/documental-types.service';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';

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
    ValidateFormComponent,
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    PagerComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    PdfViewerModule,
    FormsModule,
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthService,
    DocumentalTypesService,
    TypificationService,
    ValidationService,
    CookieService,
    ProductsService,
    PagingUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
