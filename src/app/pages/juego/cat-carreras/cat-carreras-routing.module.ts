import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatCarrerasPage } from './cat-carreras.page';

const routes: Routes = [
  {
    path: '',
    component: CatCarrerasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatCarrerasPageRoutingModule {}
