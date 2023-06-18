import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilpassPageRoutingModule } from './perfilpass-routing.module';

import { PerfilpassPage } from './perfilpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilpassPageRoutingModule
  ],
  declarations: [PerfilpassPage]
})
export class PerfilpassPageModule {}
