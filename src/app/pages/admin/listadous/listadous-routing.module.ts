import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadousPage } from './listadous.page';

const routes: Routes = [
  {
    path: '',
    component: ListadousPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadousPageRoutingModule {}
