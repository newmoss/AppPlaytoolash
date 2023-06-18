import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {

  constructor( private router:Router,private menu: MenuController) {
    this.menu.enable(true);
   }

  ngOnInit() {
  }
  normas(){
    this.router.navigate(['/normas'])
  }
  nosotros(){
    this.router.navigate(['/nosotros'])
  }

  perfil() {
    this.router.navigate(['/perfil-user']);
}
home(){
  this.router.navigate(['/home'])
}
}
