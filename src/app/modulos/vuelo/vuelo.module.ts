import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VueloRoutingModule } from './vuelo-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { GetComponent } from './get/get.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    GetComponent
  ],
  imports: [
    CommonModule,
    VueloRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VueloModule { }
