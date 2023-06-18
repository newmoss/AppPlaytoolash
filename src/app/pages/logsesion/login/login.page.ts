import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: any = {
    usuario: '',
    password: ''
  };

  Usuario: any = []

  constructor(private servicioBD: DbService, public alertController: AlertController, private router: Router, public toastController: ToastController, private menu: MenuController) {
    this.menu.enable(false);
  }

  //async ngOnInit() {
  // await this.storage.create();
  // }
  ngOnInit() {
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchsuario().subscribe(item => {
          this.Usuario = item;
        })
      }
    });
  }

  reg() {
    this.router.navigate(['/register']);
  }


  async home() {
    await this.servicioBD.login(this.login.usuario, this.login.password);
    if (this.login.usuario.length == 0) {
      this.presentToast("Debe ingresar su nombre de usuario")
    }
    else {
      if (this.login.usuario.length < 5) {
        this.presentToast("Su nombre de usuario debe de ser mínimo de 5 digitos")
      } else {
        if (this.login.password.length == 0) {
          this.presentToast("Debe ingresar una contraseña")
        }
        else {
          if (this.login.password.length < 4) {
            this.presentToast("Su contraseña debe de ser mínimo 4 digitos")
          } else {
            if (this.Usuario.length == 0) {
              this.presentToast("Usuario y/o contraseña incorrecta");
            }
            else {
              setTimeout(() => {
                this.vaciar();
                console.log(this.Usuario);
              },
                2000
              )
            }
          }
        }
      }
    }
  }
  vaciar() {
    this.login.usuario = '';
    this.login.password = '';
  }
  field: string;

  validateModel(model: any) {
    for (var [key, value] of Object.entries(model)) {
      if (value == "") {
        this.field = key;
        return false;
      }
    }
    return true;
  }

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
  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: '',
      message: mensaje,
      buttons: ['Cerrar']
    });

    await alert.present();
  }
}
