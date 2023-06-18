import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'game',
    loadChildren: () => import('./pages/juego/game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/logsesion/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/logsesion/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'cat-accion',
    loadChildren: () => import('./pages/juego/cat-accion/cat-accion.module').then( m => m.CatAccionPageModule)
  },
  {
    path: 'cat-aventura',
    loadChildren: () => import('./pages/juego/cat-aventura/cat-aventura.module').then( m => m.CatAventuraPageModule)
  },
  {
    path: 'cat-br',
    loadChildren: () => import('./pages/juego/cat-br/cat-br.module').then( m => m.CatBrPageModule)
  },
  {
    path: 'cat-carreras',
    loadChildren: () => import('./pages/juego/cat-carreras/cat-carreras.module').then( m => m.CatCarrerasPageModule)
  },
  {
    path: 'cat-shooter',
    loadChildren: () => import('./pages/juego/cat-shooter/cat-shooter.module').then( m => m.CatShooterPageModule)
  },
  {
    path: 'perfil-user',
    loadChildren: () => import('./pages/perfil/perfil-user/perfil-user.module').then( m => m.PerfilUserPageModule)
  },
  {
    path: 'to-comunidad',
    loadChildren: () => import('./pages/perfil/to-comunidad/to-comunidad.module').then( m => m.ToComunidadPageModule)
  },
  {
    path: 'to-soporte',
    loadChildren: () => import('./pages/logsesion/to-soporte/to-soporte.module').then( m => m.ToSoportePageModule)
  },
  {
    path: 'listado',
    loadChildren: () => import('./pages/admin/listado/listado.module').then( m => m.ListadoPageModule)
  },
  {
    path: 'to-modificar',
    loadChildren: () => import('./pages/admin/to-modificar/to-modificar.module').then( m => m.ToModificarPageModule)
  },
  {
    path: 'listadous',
    loadChildren: () => import('./pages/admin/listadous/listadous.module').then( m => m.ListadousPageModule)
  },
  {
    path: 'crearjuego',
    loadChildren: () => import('./pages/admin/crearjuego/crearjuego.module').then( m => m.CrearjuegoPageModule)
  },
  {
    path: 'appcomponent',
    loadChildren: () => import('./app.module').then( m => m.AppModule)
  },
  {
    path: 'soporte',
    loadChildren: () => import('./pages/admin/soporte/soporte.module').then( m => m.SoportePageModule)
  },
  {
    path: 'crearus',
    loadChildren: () => import('./pages/admin/crearus/crearus.module').then( m => m.CrearusPageModule)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./pages/logsesion/nosotros/nosotros.module').then( m => m.NosotrosPageModule)
  },
  {
    path: 'normas',
    loadChildren: () => import('./pages/logsesion/normas/normas.module').then( m => m.NormasPageModule)
  },
  {
    path: 'listadores',
    loadChildren: () => import('./pages/admin/listadores/listadores.module').then( m => m.ListadoresPageModule)
  },
  {
    path: 'to-modificaruser',
    loadChildren: () => import('./pages/admin/to-modificaruser/to-modificaruser.module').then( m => m.ToModificaruserPageModule)
  },
  {
    path: 'perfilpass',
    loadChildren: () => import('./pages/perfil/perfilpass/perfilpass.module').then( m => m.PerfilpassPageModule)
  },
  {
    path: 'micuenta',
    loadChildren: () => import('./pages/perfil/micuenta/micuenta.module').then( m => m.MicuentaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
