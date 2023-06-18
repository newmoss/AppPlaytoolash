import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearjuegoPage } from './crearjuego.page';

const routes: Routes = [
  {
    path: '',
    component: CrearjuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearjuegoPageRoutingModule {}
