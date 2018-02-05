import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
/* MATERIAL MODULES */
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FlexLayoutModule} from "@angular/flex-layout";
/* END */
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth.module';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RoomComponent } from './room/room.component';
import { ProfileComponent } from './profile/profile.component';
/* REDUX */
import {
  applyMiddleware,
  Store,
  combineReducers,
  compose,
  createStore
} from 'redux';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { AddUserComponent } from './add-user/add-user.component';
interface IAppState { /* ... */ };
/* END */
const ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginSignupComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    HomeComponent,
    RoomComponent,
    ProfileComponent,
    AddUserComponent
  ],
  entryComponents: [RoomComponent, ProfileComponent, AddUserComponent],
  imports: [
    RouterModule.forRoot(ROUTES),
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    HttpModule,
    /* MATERIAL MODULES */
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FlexLayoutModule
    /* END */
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
