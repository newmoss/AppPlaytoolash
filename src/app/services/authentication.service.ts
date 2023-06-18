import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = "admin";
  pass = 1234;

  authState = new BehaviorSubject(false);

  constructor(private platform: Platform, public storage: Storage, private toastController: ToastController, private router: Router) {
    this.platform.ready().then(() => {
      //validar si esta lofueado o no
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true)
      }
    })
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  public load: Boolean = false;

  login(usr: string, passw: number) {
    if (usr == this.user && passw == this.pass) {
      this.storage.set('USER_INFO', usr).then((response) => {
        let navigationExtras: NavigationExtras = {
          state: { cadena: usr }
        }
        this.load = true;
        setTimeout(() => {
          this.load = false;
          this.presentToast("Bienvenido a Playtoolash " + usr);
          this.authState.next(true);
          this.router.navigate(['/home'], navigationExtras);
        },
          2000
        )
      })
    }
    else {
      this.presentToast("Usuario y/o contraseña incorrecta");
    }
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.presentToast("Se ha cerrado la sesión correctamente");
      this.authState.next(false);
      this.router.navigate(['/login']);
    })
  }
  
  isAuthenticated() {
    return this.authState.value;
  }
}
