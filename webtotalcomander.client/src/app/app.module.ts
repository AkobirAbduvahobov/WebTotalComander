import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { FilterMenuModule, GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import { ToastrModule } from 'ngx-toastr';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { PagerModule } from '@progress/kendo-angular-pager';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FilterModule } from '@progress/kendo-angular-filter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, GridModule,ButtonsModule,
    BrowserAnimationsModule, FormsModule,ComboBoxModule,IndicatorsModule,
    SVGIconModule, ToastrModule.forRoot(),
    DialogModule,PagerModule,FormsModule,
    ReactiveFormsModule,
    InputsModule,
    DateInputsModule,
    LabelModule,
    ButtonsModule,
    FilterMenuModule,
    FilterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
