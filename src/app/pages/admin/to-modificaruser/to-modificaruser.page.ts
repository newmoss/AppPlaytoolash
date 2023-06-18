import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-to-modificaruser',
  templateUrl: './to-modificaruser.page.html',
  styleUrls: ['./to-modificaruser.page.scss'],
})
export class ToModificaruserPage implements OnInit {

  usuario: any = {
    rut: '',
    nombres: '',
    apellidos: '',
    fecha: '',
    email: '',
    nick: '',
    id_tipo_user: ''
  }
  constructor(private router: Router, private activeroute: ActivatedRoute, private servicioBD: DbService,private menu: MenuController) {
    this.menu.enable(true);
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario.rut = this.router.getCurrentNavigation().extras.state.id;
        this.usuario.nombres = this.router.getCurrentNavigation().extras.state.nombre;
        this.usuario.apellidos = this.router.getCurrentNavigation().extras.state.apellido;
        this.usuario.fecha = this.router.getCurrentNavigation().extras.state.fecha;
        this.usuario.email = this.router.getCurrentNavigation().extras.state.email;
        this.usuario.nick = this.router.getCurrentNavigation().extras.state.nick;
        this.usuario.id_tipo_user = this.router.getCurrentNavigation().extras.state.id_tipo_user;
      }
    })
  }

  ngOnInit() {
  }

  editar() {
    this.servicioBD.updateUsuario(this.usuario.rut, this.usuario.id_tipo_user);
    this.servicioBD.presentAlert("Modificación Realizada");
    this.router.navigate(['/listadous']);
  }

}
