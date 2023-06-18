import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.page.html',
  styleUrls: ['./perfil-user.page.scss'],
})
export class PerfilUserPage implements OnInit {

  user: any = {
    nombre: '',
    rut: '',
    apellidos: '',
    email: '',
    nickname: '',

  };
  image: any;


  oldPass: any;
  newPass: any;
  reNewPass: any;

  constructor(private alertCtrl: AlertController, private servicioBD: DbService, private router: Router, private activedRoute: ActivatedRoute, private camera: Camera, private webView: WebView,private menu: MenuController) { 
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


  micuenta() {
    let navigationExtras: NavigationExtras = {
      state: { img: this.image }
    }
    this.router.navigate(['/micuenta'], navigationExtras)
  }
  perfilpass() {
    let navigationExtras: NavigationExtras = {
      state: { img: this.image }
    }
    this.router.navigate(['/perfilpass'],navigationExtras)
  }

  borrar() {
    //this.servicioBD.deleteUsuario(datos.rut);
    let navigationExtras: NavigationExtras = {
      state: { img: this.image }
    }
    this.router.navigate(['/to-comunidad'],navigationExtras)
  }
  cerrarsesion(user) {
    console.log(user.nickname);
    this.servicioBD.cerrarSesion(user.nickname);
    console.log(user.nickname);
    this.servicioBD.presentLoading('Cerrando sesión..');
    setTimeout(() => {
      this.router.navigate(['/login']);
    },
      2000
    )
  }
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI, //DATA_URL
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options)
      .then((imageData) => {
        this.image = this.webView.convertFileSrc(imageData);//'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        console.log(err);
      });
  }
  uploadPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options)
      .then((imageData) => {
        this.image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        console.log(err);
      });
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
