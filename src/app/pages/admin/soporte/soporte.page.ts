import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
})
export class SoportePage implements OnInit {
  user: any = {
    nombre: '',
    rut: '',
    nickname: ''
  };
  constructor(
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    private servicioDB: DbService,
    public loadingController: LoadingController,
    private menu: MenuController) {
    this.menu.enable(true);
  }

  ngOnInit() {

    this.servicioDB.dbState().subscribe((res) => {
      if (res) {
        this.servicioDB.fetchUsuarioLogeado().subscribe(datos => {
          this.user.nombres = datos[0].nombres;
          this.user.rut = datos[0].id_rut;
          this.user.nickname = datos[0].nickname;

        })
      }
    });
  }

  usuario: any[] = []


  listauser() {
    this.router.navigate(['/listadous']);
  }
  listajuego() {
    this.router.navigate(['/listado']);
  }
  listares() {
    this.router.navigate(['/listadores']);
  }
  crearjuego() {
    this.router.navigate(['/crearjuego']);
  }
  crearus() {
    this.router.navigate(['/crearus']);
  }
  cerrarsesion(user) {
    console.log(user.nickname);
    this.servicioDB.cerrarSesion(user.nickname);
    console.log(user.nickname);
    this.presentLoading();
    setTimeout(() => {
      this.router.navigate(['/login']);
    },
      2000
    )
  }

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        message: message,
        duration: duration ? duration : 1500
      }
    );
    toast.present();
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
