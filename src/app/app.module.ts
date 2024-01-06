import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CookieService} from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './modules/components/navbar/navbar.component';
import { FooterComponent } from './modules/components/footer/footer.component';
import { HomeComponent } from './modules/components/home/home.component';
import { CheckoutComponent } from './modules/components/checkout/checkout.component';
import { LoginComponent } from './modules/components/login/login.component';
import { ProductsComponent } from './modules/components/products/products.component';
import { AboutComponent } from './modules/components/about/about.component';
import { CartComponent } from './modules/components/cart/cart.component';
import { DetailsComponent } from './modules/components/details/details.component';
import { SignupComponent } from './modules/components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import { TermsComponent } from './modules/components/terms/terms.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CheckoutComponent,
    LoginComponent,
    ProductsComponent,
    AboutComponent,
    CartComponent,
    DetailsComponent,
    SignupComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
