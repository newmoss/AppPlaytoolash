import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {

  // user: any = {
  //   nombre: '',
  //   rut: '',
  //   nickname: ''
  // };
  constructor( private router: Router,private servicioBD: DbService) {}

  ngOnInit() {

    // this.servicioBD.dbState().subscribe((res) => {
    //   if (res) {
    //     this.servicioBD.fetchUsuarioLogeado().subscribe(datos => {
    //       this.user.nombres = datos[0].nombres;
    //       this.user.rut = datos[0].id_rut;
    //       this.user.nickname = datos[0].nickname;

    //     })
    //   }
    // });
  }
  home() {
    this.router.navigate(['/home']);
  }
  //Perfil de Usuario
  perfil() {
    this.router.navigate(['/perfil-user'])
  }
  //Acción
  accion() {
    this.router.navigate(['/cat-accion'])
  }
  //Aventura
  aventura() {
    this.router.navigate(['/cat-aventura'])
  }
  //Battle Royale
  br() {
    this.router.navigate(['/cat-br'])
  }
  //Carreras
  carreras() {
    this.router.navigate(['/cat-carreras']);
  }
  //Shooter
  shooter() {
    this.router.navigate(['/cat-shooter']);
  }



  //Soporte
  listado() {
    this.router.navigate(['/listado']);
  }

  normas() {
    this.router.navigate(['/normas']);
  }
  // cerrarsesion(user) {
  //   console.log(user.nickname)
  //   this.servicioBD.cerrarSesion(user.nickname);
  //   console.log(user.nickname)
  //   this.router.navigate(['/login']);
  // }

}