import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-perfilpass',
  templateUrl: './perfilpass.page.html',
  styleUrls: ['./perfilpass.page.scss'],
})
export class PerfilpassPage implements OnInit {

  user: any[] = [];
  oldPass: any;
  newPass: any;
  reNewPass: any;
  image:any;
  constructor(private alertCtrl: AlertController, private servicioBD: DbService, private router: Router, private activedRoute: ActivatedRoute,private menu: MenuController) {
    this.menu.enable(true);
    this.activedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.image = this.router.getCurrentNavigation().extras.state.img;
      }
    })
   }

  async ngOnInit() {
    await this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchUsuarioLogeado().subscribe(datos => {
          this.user = datos;
        });
      }
    });

  }
  perfil() {
    let navigationExtras: NavigationExtras = {
      state: { img: this.image }
    }
    this.router.navigate(['/perfil-user'], navigationExtras)
  }
  async guardar(user) {
    if (await this.servicioBD.validarPass(this.oldPass) == 0) {
      if (this.newPass == this.reNewPass) {
        this.servicioBD.updatePass(this.newPass);
        this.vaciar();
        console.log(user.nickname);
        this.servicioBD.cerrarSesion(user.nickname);
        console.log(user.nickname);
        this.servicioBD.presentLoading('Espere..');
        setTimeout(() => {
          this.vaciar();
          this.presentAlert('Contraseña actualizada');
          this.router.navigate(['/login']);
        },
          2000
        )
      }
      else {
        this.presentAlert('Las contraseñas no coinciden')
      }
    }
    else {
      this.presentAlert('La contraseña actual es incorrecta')
    }
  }
  
  vaciar() {
    this.oldPass = '';
    this.newPass = '';
    this.reNewPass = '';
  }
  async presentAlert(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: '',
      message: mensaje,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}