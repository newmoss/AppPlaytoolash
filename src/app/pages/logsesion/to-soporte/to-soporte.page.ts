import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-to-soporte',
  templateUrl: './to-soporte.page.html',
  styleUrls: ['./to-soporte.page.scss'],
})
export class ToSoportePage implements OnInit {

  log: any = {
    correo: ''
  };

  constructor(public router: Router,
    public alertController: AlertController, public toastController: ToastController, private servicioDB: DbService,private menu: MenuController) {
      this.menu.enable(false);
     }

  ngOnInit() {

  }

  login() {
    var val = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.log.correo.length == 0) {
      this.presentToast("Debe ingresar un Correo Electrónico")
    } else {
      if (!val.test(this.log.correo)) {
        this.presentToast("Correo Electrónico no valido")
      } else {
        this.servicioDB.presentLoading('Espere ..');
        setTimeout(() => {
          this.router.navigate(['/login'])
          this.log.correo = '';
          this.servicioDB.presentAlert("Se envio un correo de verificación para restablecer tu cuenta")
        },
          2000
        )
      }
    }
  }


  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        message: message,
        duration: duration ? duration : 1500,
        color: 'light'
      }
    );
    toast.present();
  }
}
