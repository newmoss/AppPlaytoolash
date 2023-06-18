import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToComunidadPage } from './to-comunidad.page';

const routes: Routes = [
  {
    path: '',
    component: ToComunidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToComunidadPageRoutingModule {}
