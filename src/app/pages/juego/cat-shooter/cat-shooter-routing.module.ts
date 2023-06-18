import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatShooterPage } from './cat-shooter.page';

const routes: Routes = [
  {
    path: '',
    component: CatShooterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatShooterPageRoutingModule {}
