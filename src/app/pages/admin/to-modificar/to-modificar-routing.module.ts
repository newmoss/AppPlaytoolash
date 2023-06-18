import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToModificarPage } from './to-modificar.page';

const routes: Routes = [
  {
    path: '',
    component: ToModificarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToModificarPageRoutingModule {}
