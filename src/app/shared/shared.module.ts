import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { SMMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule,
    SMMaterialModule
  ],
  exports: [
    SMMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
