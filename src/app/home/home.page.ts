import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  game: any[] = [];
  games: any[] = [];
  user: any[] = [];

  constructor(public alertController: AlertController, private router: Router, private servicioBD: DbService, public loadingController: LoadingController, private menu: MenuController) {
    this.menu.enable(true);
  }
  async ngOnInit() {
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchJuegoBattleroyale().subscribe(item2 => {
          this.game = item2;
        });
      }
    });

    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchJuego().subscribe(item => {
          this.games = item;
        });
      }
    });
    await this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchUsuarioLogeado().subscribe(datos => {
          this.user = datos;

        });
      }
    });

  }
  //Slider
  option = {
    slidesPerView: 1.2,
    centeredSlides: true,
    loop: true,
    spaceBetween: 1,
    autoplay: true,
  }
  cerrarsesion(user) {
    console.log(user.nickname);
    this.servicioBD.cerrarSesion(user.nickname);
    console.log(user.nickname);
    this.presentLoading();
    setTimeout(() => {
      this.router.navigate(['/login']);
    },
      2000
    )
  }
  normas() {
    this.router.navigate(['/normas'])
  }
  nosotros() {
    this.router.navigate(['/nosotros'])
  }
  perfil() {
    this.router.navigate(['/perfil-user']);

  }
  soporte() {
    this.router.navigate(['/soporte']);

  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cerrando sesión..',
      duration: 1900
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}