import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToModificaruserPage } from './to-modificaruser.page';

const routes: Routes = [
  {
    path: '',
    component: ToModificaruserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToModificaruserPageRoutingModule {}
