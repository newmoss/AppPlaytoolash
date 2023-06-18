import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-listadores',
  templateUrl: './listadores.page.html',
  styleUrls: ['./listadores.page.scss'],
})
export class ListadoresPage implements OnInit {

  resennia: any[] = []
  constructor(private servicioBD: DbService,private menu: MenuController) {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchResennia().subscribe(item2 => {
          this.resennia = item2;
        });
      }
    });
  }

  eliminarRes(item2) {
    this.servicioBD.deleteResennia(item2.id_resennia)
    console.log('Resennia eliminado');
    this.servicioBD.presentAlert("Reseña eliminada");

  }
}
