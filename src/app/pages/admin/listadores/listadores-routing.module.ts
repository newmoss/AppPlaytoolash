import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoresPage } from './listadores.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoresPageRoutingModule {}
