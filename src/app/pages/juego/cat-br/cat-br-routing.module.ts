import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatBrPage } from './cat-br.page';

const routes: Routes = [
  {
    path: '',
    component: CatBrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatBrPageRoutingModule {}
