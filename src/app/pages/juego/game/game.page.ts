import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})


export class GamePage implements OnInit {
  juego: any = {
    id: '',
    nombre: '',
    fecha_lanz: '',
    descripcion: '',
    editor: '',
    plataforma: '',
    imagen: '',
  }
  resena: any = {
    resennia: '',
  }

  user: any = {
    nombre: '',
    rut: '',
    apellidos: '',
    email: '',
    nickname: '',

  };
  lista: any[] = [];

  fecha: Date = new Date();

  constructor(private activedRoute: ActivatedRoute, private router: Router, private servicioDB: DbService, public toastController: ToastController,private menu: MenuController) {
    this.menu.enable(true);
    //  this.servicioDB.buscarResInner(this.juego.id);

    this.activedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.juego.id = this.router.getCurrentNavigation().extras.state.id;
        this.juego.nombre = this.router.getCurrentNavigation().extras.state.nombre;
        this.juego.fecha_lanz = this.router.getCurrentNavigation().extras.state.fecha;
        this.juego.descripcion = this.router.getCurrentNavigation().extras.state.descripcion;
        this.juego.editor = this.router.getCurrentNavigation().extras.state.editor;
        this.juego.plataforma = this.router.getCurrentNavigation().extras.state.plataforma;
        this.juego.imagen = this.router.getCurrentNavigation().extras.state.imagen;

      }
    });

  }
  ngOnInit() {
    // await this.servicioDB.buscarResInner(this.juego.id);
    this.servicioDB.dbState().subscribe((res) => {
      if (res) {
        this.servicioDB.fetchResennia().subscribe(item => {
          this.lista = item;
        })
        this.servicioDB.fetchUsuarioLogeado().subscribe(datos => {
          this.user.nombre = datos[0].nombres;
          this.user.rut = datos[0].id_rut;
          this.user.apellidos = datos[0].apellidos;
          this.user.email = datos[0].email;
          this.user.nickname = datos[0].nickname;
        })
      }
    });
  }


  async enviar() {
    if (this.resena.resennia.length == 0) {
      this.presentToast('Para enviar una reseña sobre el juego debe escribir algo')
      console.log('vacio')
    } else {
      this.servicioDB.presentLoading('Publicando Reseña..');
      await setTimeout(() => {
         this.servicioDB.addResennia(this.resena.resennia, this.fecha, this.user.nickname, this.juego.id);//ID PARA SELECT
        //  await this.servicioDB.buscarResInner(this.juego.id);
        console.log('comentario enviado');
        this.resena.resennia = '';
      },
        2000
      )
    }
  };

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        cssClass: '.toast-wrapper.toast-bottom',
        message: message,
        position: 'bottom',
        duration: duration ? duration : 2000,
        color: 'light'
      }
    );
    toast.present();
  }

}
