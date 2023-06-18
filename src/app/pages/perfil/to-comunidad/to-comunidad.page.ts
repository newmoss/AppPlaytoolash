import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-to-comunidad',
  templateUrl: './to-comunidad.page.html',
  styleUrls: ['./to-comunidad.page.scss'],
})
export class ToComunidadPage implements OnInit {
  user: any = {
    nombre: '',
    rut: '',
    apellidos: '',
    email: '',
    nickname: '',

  };
  image: any;

  Pass: any;
  Pass2: any;
  constructor(private servicioBD: DbService, public toastController: ToastController, private router: Router, public loadingController: LoadingController,private activedRoute: ActivatedRoute,private menu: MenuController) { 
    this.menu.enable(true);
    this.activedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.image = this.router.getCurrentNavigation().extras.state.img;
      }
    })
  }
  ngOnInit() {
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchUsuarioLogeado().subscribe(datos => {
          this.user.nombre = datos[0].nombres;
          this.user.rut = datos[0].id_rut;
          this.user.apellidos = datos[0].apellidos;
          this.user.email = datos[0].email;
          this.user.nickname = datos[0].nickname;

        })
      }
    });
  }
  perfil() {
    let navigationExtras: NavigationExtras = {
      state: { img: this.image }
    }
    this.router.navigate(['/perfil-user'], navigationExtras)
  }
  async borrar(datos) {
    // if (this.Pass.length == 0){
    //   this.presentToast('La contraseña actual esta vacio');
    // }
    // else{
    //   if (this.Pass2.length == 0)
    //   this.presentToast('Repetir contraseña esta vacio');
    // }
    if (this.Pass == this.Pass2) {
      if (await this.servicioBD.validarPass(this.Pass) == 0) {
        this.servicioBD.deleteUsuario(datos.rut);
        this.presentLoading();
        setTimeout(() => {
          this.router.navigate(['/login']);
          this.Pass = '';
          this.servicioBD.presentAlert("Su cuenta fue eliminada");
        },
          2000
        )
      }
      else {
        this.servicioBD.presentAlert("Su contraseña es incorrecta");
      } 
    }
    else {
      this.servicioBD.presentAlert("Las contraseñas no coinciden");
    }

  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere un momento..',
      duration: 1900
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
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
  // accion() {
  //   this.router.navigate(['/cat-accion']);
  // }
  // //Aventura
  // aventura() {
  //   this.router.navigate(['/cat-aventura']);
  // }
  // //Battle Royale
  // br() {
  //   this.router.navigate(['/cat-br']);
  // }
  // //Carreras
  // carreras() {
  //   this.router.navigate(['/cat-carreras']);
  // }
  // //Shooter
  // shooter() {
  //   this.router.navigate(['/cat-shooter']);
  // }

}
