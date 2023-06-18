import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-crearjuego',
  templateUrl: './crearjuego.page.html',
  styleUrls: ['./crearjuego.page.scss'],
})
export class CrearjuegoPage implements OnInit {


  constructor(public router: Router,public alertController: AlertController, public toastController: ToastController, private servicioDB: DbService,private menu: MenuController) { 
    this.menu.enable(true);

  }

  ngOnInit() {
  }
  
  nuevoGame: any = {
    nombre: "",
    fecha_lanz: "",
    descripcion: "",
    editor: "",
    plataforma: "",
    imagen: "",
    id_categoria: ""
  }

  async crear() {
    //Nombre
    if (this.nuevoGame.nombre.length == 0) {
      this.presentToast("Debe ingresar un titulo")
    }
    else {
      if (this.nuevoGame.nombre.length < 3) {
        this.presentToast("Minimo el titulo debe contener 3 digitos")
      } else {
        if (this.nuevoGame.id_categoria.length == 0) {
          this.presentToast("Ingrese una categoria")
        }
        else {
          //Fecha
          if (this.nuevoGame.fecha_lanz.length == 0) {
            this.presentToast("Ingrese la fecha de lanzamiento")
          }
          else {
            //Descripcion
            if (this.nuevoGame.descripcion.length == 0) {
              this.presentToast("Ingrese una descripcion")
            }
            else {
              if (this.nuevoGame.descripcion.length < 5) {
                this.presentToast("La descripcion debe de ser mínimo 5")
              }
              else {
                //Editor
                if (this.nuevoGame.editor.length == 0) {
                  this.presentToast("Ingrese desarrollador")
                }
                else {
                  //Plataforma
                  if (this.nuevoGame.plataforma.length == 0) {
                    this.presentToast("Por favor Ingrese la plataforma")
                  }
                  else {
                    if (this.nuevoGame.imagen == 0) {
                      this.presentToast("No hay imagen, se agregara una imagen predeterminada.")
                      this.nuevoGame.imagen = "assets/icon/noimg.png";
                    } else {
                      await this.servicioDB.addGame(this.nuevoGame.nombre, this.nuevoGame.fecha_lanz, this.nuevoGame.descripcion, this.nuevoGame.editor, this.nuevoGame.plataforma, this.nuevoGame.imagen, this.nuevoGame.id_categoria);
                      this.presentToast("Juego Registrado")
                      this.router.navigate(['/listado']);
                      this.nuevoGame.nombre= '';
                      this.nuevoGame.fecha_lanz= '';
                      this.nuevoGame.descripcion= '';
                      this.nuevoGame.editor= '',
                      this.nuevoGame.plataforma= '';
                      this.nuevoGame.imagen= '';
                      this.nuevoGame.id_categoria= '';
                    }
                  }
                }
              }
            }
          }

        }
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
