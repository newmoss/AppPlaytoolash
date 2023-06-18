import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-cat-br',
  templateUrl: './cat-br.page.html',
  styleUrls: ['./cat-br.page.scss'],
})
export class CatBrPage implements OnInit {

  Juego: any [] = []

  constructor(private servicioBD: DbService,private router: Router,private menu: MenuController) {
    this.menu.enable(true);
   }

  ngOnInit() {
    this.servicioBD.dbState().subscribe((res) =>{
      if(res){
        this.servicioBD.fetchJuegoBattleroyale().subscribe(item2 =>{
          this.Juego = item2;
        });
      }
    });
  }
  descripcion(item2) {
    let navigationExtras: NavigationExtras = {
      state: { id: item2.id_juego, nombre: item2.nombre, fecha: item2.fecha_lanz,  descripcion: item2.descripcion, editor: item2.editor, plataforma: item2.plataforma,imagen:item2.imagen }
    }
    this.router.navigate(['/game'], navigationExtras);
    
  }

  
}
