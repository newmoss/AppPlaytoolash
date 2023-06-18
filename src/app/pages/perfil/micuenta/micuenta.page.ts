import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.page.html',
  styleUrls: ['./micuenta.page.scss'],
})
export class MicuentaPage implements OnInit {

  user: any ={
    nombre:'',
    rut:'',
    apellidos:'',
    email:'',
    nickname:'',
  
  };
  image:any;
  
  
    constructor(private alertCtrl: AlertController,private servicioBD: DbService, private router: Router,private activedRoute:ActivatedRoute,private menu: MenuController) {
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
          this.servicioBD.fetchUsuarioLogeado().subscribe(datos =>{
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
    borrar(){
      //this.servicioBD.deleteUsuario(datos.rut);
      this.router.navigate(['/to-comunidad']);
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
  