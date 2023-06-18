import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-to-modificar',
  templateUrl: './to-modificar.page.html',
  styleUrls: ['./to-modificar.page.scss'],
})
export class ToModificarPage implements OnInit {

  juego: any = {
    id: '',
    nombre: '',
    fecha_lanz: '',
    descripcion: '',
    editor: '',
    plataforma: '',
    imagen: '',
    id_categoria: ''
  }
  constructor(private router: Router, private activeroute: ActivatedRoute, private servicioBD: DbService,private menu: MenuController) {
    this.menu.enable(true);
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.juego.id = this.router.getCurrentNavigation().extras.state.id;
        this.juego.nombre = this.router.getCurrentNavigation().extras.state.nombre;
        this.juego.fecha_lanz = this.router.getCurrentNavigation().extras.state.fecha;
        this.juego.descripcion = this.router.getCurrentNavigation().extras.state.descripcion;
        this.juego.editor = this.router.getCurrentNavigation().extras.state.editor;
        this.juego.plataforma = this.router.getCurrentNavigation().extras.state.plataforma;
        this.juego.imagen = this.router.getCurrentNavigation().extras.state.imagen;
        this.juego.id_categoria = this.router.getCurrentNavigation().extras.state.id_categoria;

      }
    })
  }


  ngOnInit() {
  }

  editar() {
    if (this.juego.imagen.length == 0){
      this.juego.imagen = "assets/icon/noimg.png";
    }
    this.servicioBD.updateJuego(this.juego.id, this.juego.nombre, this.juego.fecha_lanz, this.juego.descripcion, this.juego.editor, this.juego.plataforma, this.juego.imagen, this.juego.id_categoria);
    this.servicioBD.presentAlert("Modificación Realizada");
    this.router.navigate(['/listado']);
  }
}
