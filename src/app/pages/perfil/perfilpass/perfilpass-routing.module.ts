import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilpassPage } from './perfilpass.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilpassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilpassPageRoutingModule {}
