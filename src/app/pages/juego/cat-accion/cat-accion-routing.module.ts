import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatAccionPage } from './cat-accion.page';

const routes: Routes = [
  {
    path: '',
    component: CatAccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatAccionPageRoutingModule {}
