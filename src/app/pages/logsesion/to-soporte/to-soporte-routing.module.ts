import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToSoportePage } from './to-soporte.page';

const routes: Routes = [
  {
    path: '',
    component: ToSoportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToSoportePageRoutingModule {}
