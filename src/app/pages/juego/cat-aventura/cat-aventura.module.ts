import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatAventuraPageRoutingModule } from './cat-aventura-routing.module';

import { CatAventuraPage } from './cat-aventura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatAventuraPageRoutingModule
  ],
  declarations: [CatAventuraPage]
})
export class CatAventuraPageModule {}
