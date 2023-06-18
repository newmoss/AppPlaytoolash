import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-listadous',
  templateUrl: './listadous.page.html',
  styleUrls: ['./listadous.page.scss'],
})
export class ListadousPage implements OnInit {
  Usuario: any[] = []

  Juego: any[] = []
  constructor(private servicioBD: DbService, private router: Router,private menu: MenuController) {
    this.menu.enable(true);

  }

  async ngOnInit() {
    await this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchUsuario().subscribe(item => {
          this.Usuario = item;
        });
      }
    });
  }

  eliminar(item) {
    this.servicioBD.deleteUsuario(item.id_rut)
    console.log('Eliminado');
    this.servicioBD.presentAlert("Usuario eliminado");
  }

  editarus(item) {
    console.log(item);
    let navigationExtras: NavigationExtras = {
      state: { id: item.id_rut, nombre: item.nombres, apellido: item.apellidos, fecha: item.fecha_nac, email: item.email, nick: item.nickname, id_tipo_user: item.id_tipo_user }
    }
    this.router.navigate(['/to-modificaruser'], navigationExtras);

  }
}
