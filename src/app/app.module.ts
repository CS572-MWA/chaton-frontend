import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
/* MATERIAL MODULES */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCardModule, MatTabsModule, MatInputModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
/* END */
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { AuthModule } from './auth.module';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

const ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginSignupComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '***', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    /* MATERIAL MODULES */
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    /* END */
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    HttpModule,
  ],
  providers: [HttpService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
