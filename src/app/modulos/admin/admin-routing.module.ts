import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './usuarios/create/create.component';
import { EditComponent } from './usuarios/edit/edit.component';
import { GetComponent } from './usuarios/get/get.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },{
    //agregar el id como adicional para poder editar
    path: 'edit/:id',
    component: EditComponent,
  },{
    path: 'get',
    component: GetComponent,
  },
  {
    path: '',
    redirectTo: 'get'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
