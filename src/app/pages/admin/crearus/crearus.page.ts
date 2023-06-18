import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-crearus',
  templateUrl: './crearus.page.html',
  styleUrls: ['./crearus.page.scss'],
})
export class CrearusPage implements OnInit {

  constructor(public router: Router, public alertController: AlertController, public toastController: ToastController, private servicioDB: DbService,private menu: MenuController) {
    this.menu.enable(true);
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
    password2: "",
    tipo: ""
  }

  usuario: any[] = []

  async confirmar() {
    var val = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (this.nuevoUser.tipo.length == 0) {
      this.presentToast("Debe ingresar un tipo de usuario")
    }
    else {
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
            this.presentToast("Debe ingresar su Nombre de usuario")
          }
          else {
            if (this.nuevoUser.nickname.length < 5) {
              this.presentToast("Su Nickname debe de ser mínimo 5")
            } else {
              //NOMBRE
              if (this.nuevoUser.nombres.length == 0) {
                this.presentToast("Debe ingresar su Nombre")
              }
              else {
                if (this.nuevoUser.nombres.length < 3) {
                  this.presentToast("Su Nombre debe de ser mínimo 3")
                }
                else {
                  //APELLIDO
                  if (this.nuevoUser.apellidos.length == 0) {
                    this.presentToast("Debe ingresar su Apellido")
                  }
                  else {
                    if (this.nuevoUser.fecha_nac.length == 0) {
                      this.presentToast("ingresar su fecha de nacimiento")
                    } else {
                      //CORREO
                      if (this.nuevoUser.email.length == 0) {
                        this.presentToast("Debe ingresar su Correo Electrónico")
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
                              this.presentToast("Su Contraseña debe de ser mínimo 4")
                            }
                            else {
                              if (this.nuevoUser.password2.length == 0) {
                                this.presentToast("Debe repita la misma Contraseña")
                              }
                              else {
                                if (this.nuevoUser.password != this.nuevoUser.password2) {
                                  this.presentToast("Las Contraseñas no coinciden")
                                }
                                else {
                                  await this.servicioDB.validarCuenta(this.nuevoUser.id_rut, this.nuevoUser.nombres, this.nuevoUser.apellidos, this.nuevoUser.fecha_nac, this.nuevoUser.email, this.nuevoUser.nickname, this.nuevoUser.password, this.nuevoUser.tipo, 0);
                                  this.servicioDB.presentLoading('Creando cuenta..');
                                  setTimeout(() => {
                                    this.nuevoUser.id_rut='';
                                    this.nuevoUser.nombres='';
                                    this.nuevoUser.apellidos='';
                                    this.nuevoUser.fecha_nac='';
                                    this.nuevoUser.email='';
                                    this.nuevoUser.nickname='';
                                    this.nuevoUser.password='';
                                    this.nuevoUser.password2='';
                                    this.nuevoUser.tipo='';
                                    this.router.navigate(['/listadous']);
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
