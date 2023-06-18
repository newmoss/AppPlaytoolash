import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatAventuraPage } from './cat-aventura.page';

const routes: Routes = [
  {
    path: '',
    component: CatAventuraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatAventuraPageRoutingModule {}
