import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  constructor(public router: Router,
    public alertController: AlertController, public toastController: ToastController, private servicioDB: DbService, private menu: MenuController) {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.servicioDB.dbState().subscribe((res) => {
      if (res) {
        this.servicioDB.fetchUsuario().subscribe(item => {
          this.usuario = item;
        })
      }
    });
  }

  nuevoUser: any = {
    id_rut: "",
    nombres: "",
    apellidos: "",
    fecha_nac: "",
    email: "",
    nickname: "",
    password: "",
    password2: ""
  }

  usuario: any[] = []

  async confirmar() {
    var val = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //NICKNAME
    if (this.nuevoUser.id_rut.length == 0) {
      this.presentToast("Debe ingresar su rut")
    }
    else {
      if (this.nuevoUser.id_rut.length < 8) {
        this.presentToast("Minimo su rut debe contener 8 digitos")
      }
      else {
        if (this.nuevoUser.nickname.length == 0) {
          this.presentToast("Debe ingresar un nombre de usuario")
        }
        else {
          if (this.nuevoUser.nickname.length < 5) {
            this.presentToast("Su Nickname debe de ser mínimo de 5 digitos")
          } else {
            //NOMBRE
            if (this.nuevoUser.nombres.length == 0) {
              this.presentToast("Debe ingresar sus nombres")
            }
            else {
              if (this.nuevoUser.nombres.length < 3) {
                this.presentToast("Su nombre debe contener mínimo 3 digitos")
              }
              else {
                //APELLIDO
                if (this.nuevoUser.apellidos.length == 0) {
                  this.presentToast("Debe ingresar sus apellidos")
                }
                else {
                  if (this.nuevoUser.fecha_nac.length == 0) {
                    this.presentToast("Ingrese su fecha de nacimiento")
                  } else {
                    //CORREO
                    if (this.nuevoUser.email.length == 0) {
                      this.presentToast("Debe ingresar un Correo Electrónico")
                    } else {
                      if (!val.test(this.nuevoUser.email)) {
                        this.presentToast("Correo Electrónico no valido")
                      }
                      else {
                        //CONTRASEÑA
                        if (this.nuevoUser.password.length == 0) {
                          this.presentToast("Debe ingresar una Contraseña")
                        }
                        else {
                          if (this.nuevoUser.password.length < 4) {
                            this.presentToast("Su Contraseña debe ser mínimo de 4 digitos")
                          }
                          else {
                            if (this.nuevoUser.password2.length == 0) {
                              this.presentToast("Debe repetir la misma Contraseña")
                            }
                            else {
                              if (this.nuevoUser.password != this.nuevoUser.password2) {
                                this.presentToast("Las Contraseñas no coinciden, intente nuevamente")
                              }
                              else {
                                await this.servicioDB.validarCuenta(this.nuevoUser.id_rut, this.nuevoUser.nombres, this.nuevoUser.apellidos, this.nuevoUser.fecha_nac, this.nuevoUser.email, this.nuevoUser.nickname, this.nuevoUser.password, 2, 0);
                                this.servicioDB.presentLoading('Creando cuenta..');
                                setTimeout(() => {
                                  this.nuevoUser.id_rut = '';
                                  this.nuevoUser.nombres = '';
                                  this.nuevoUser.apellidos = '';
                                  this.nuevoUser.fecha_nac = '';
                                  this.nuevoUser.email = '';
                                  this.nuevoUser.nickname = '';
                                  this.nuevoUser.password = '';
                                  this.nuevoUser.password2 = '';
                                  this.router.navigate(['/login']);
                                  this.servicioDB.presentAlert('Cuenta creada exitosamente');
                                },
                                  2000
                                )
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
