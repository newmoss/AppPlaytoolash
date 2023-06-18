import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  Usuario: any[] = []

  Juego: any[] = []
  constructor(private servicioBD: DbService, private router: Router,private menu: MenuController) {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {

        this.servicioBD.fetchJuego().subscribe(item2 => {
          this.Juego = item2;
        });
      }
    });
  }


  editar(item2) {
    console.log(item2);
    let navigationExtras: NavigationExtras = {
      state: { id: item2.id_juego, nombre: item2.nombre, fecha: item2.fecha_lanz, descripcion: item2.descripcion, editor: item2.editor, plataforma: item2.plataforma, imagen: item2.imagen, id_categoria: item2.id_categoria }
    }
    this.router.navigate(['/to-modificar'], navigationExtras);

  }
  eliminarjuego(item2) {
    this.servicioBD.deleteJuego(item2.nombre)
    console.log('Eliminado');
    this.servicioBD.presentAlert("Juego eliminado");
  }
}
