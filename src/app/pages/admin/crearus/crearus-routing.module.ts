import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearusPage } from './crearus.page';

const routes: Routes = [
  {
    path: '',
    component: CrearusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearusPageRoutingModule {}
