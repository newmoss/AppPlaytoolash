import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Juego } from './juego';
import { Resennia } from './resennia';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  public database: SQLiteObject;
  // USUARIOS E INSERT
  crearTipoUsuario: string = "CREATE TABLE IF NOT EXISTS TipoUsuario(id_tipo_user INTEGER PRIMARY KEY autoincrement, nom_user VARCHAR(20) NOT NULL);";
  crearUsuario: string = "CREATE TABLE IF NOT EXISTS Usuario(id_rut PRIMARY KEY , nombres VARCHAR(20) NOT NULL, apellidos VARCHAR(30) NOT NULL, fecha_nac DATE NOT NULL, email VARCHAR(30) NOT NULL, nickname VARCHAR(15) NOT NULL, password VARCHAR(8) NOT NULL, id_tipo_user INTEGER NOT NULL, status INTEGER NOT NULL,FOREIGN KEY(id_tipo_user) references TipoUsuario(id_tipo_user));";
  insertAdmin: string = "INSERT or IGNORE INTO tipousuario VALUES(1, 'administrador');";
  insertCliente: string = "INSERT or IGNORE INTO tipousuario VALUES(2, 'cliente');";
  insertUser: string = "INSERT or IGNORE INTO Usuario VALUES(91919191,'Miguel','Badilla','2000-11-27','mbadillaopazo@hotmail.com','admin','1234',1,0);";
  insertUsernormal: string = "INSERT or IGNORE INTO Usuario VALUES(19191919,'Miguel','Badilla','2000-11-27','mbadillaopazo@duoc.cl','newmoss','1234',2,0);";

  //CATEGORIAS E INSERT
  crearCategoria: string = "CREATE TABLE IF NOT EXISTS Categoria ( id_categoria PRIMARY KEY, nombre_categoria VARCHAR2(20) NOT NULL);";
  insertAcc: string = "INSERT or IGNORE INTO tipousuario VALUES(1, 'Acción');";
  insertAv: string = "INSERT or IGNORE INTO tipousuario VALUES(2, 'Aventura');";
  insertBr: string = "INSERT or IGNORE INTO tipousuario VALUES(3, 'Battle Royale');";
  insertCar: string = "INSERT or IGNORE INTO tipousuario VALUES(4, 'Carreras');";
  insertSho: string = "INSERT or IGNORE INTO tipousuario VALUES(5, 'Shooter');";

  //JUEGOS E INSERT
  crearJuego: string = "CREATE TABLE IF NOT EXISTS Juego ( id_juego INTEGER PRIMARY KEY autoincrement, nombre VARCHAR2(50) NOT NULL, fecha_lanz DATE NOT NULL, descripcion VARCHAR2(200) NOT NULL, editor VARCHAR2(20) NOT NULL, plataforma VARCHAR2(20) NOT NULL , imagen VARCHAR2(60) NOT NULL,id_categoria INTEGER NOT NULL, FOREIGN KEY(id_categoria) references Categoria(id_categoria));";
  // JUEGOS DE ACCION
  insertJuego1: string = "INSERT or IGNORE INTO Juego VALUES(9,'Grand Theft Auto V','2015-04-14','Grand Theft Auto V para PC ofrece a los jugadores la opción de explorar el galardonado mundo de Los Santos y el condado de Blaine con una resolución de 4K y disfrutar del juego a 60 fotogramas por segundo.','Rockstar Games','PC/PS5/PS4','assets/juegos/Accion/gtav.jpg',1);";
  insertJuego2: string = "INSERT or IGNORE INTO Juego VALUES(10,'HITMAN™ 2','2018-11-13','Viaja alrededor del mundo rastreando a tus objetivos en los exóticos lugares del mundo abierto de HITMAN™ 2. Desde soleadas calles hasta oscuras selvas, en ningún lado se está a salvo del asesino más creativo del mundo, el agente 47, en esta historia de suspenso y espionaje.','Warner Bros Interactive Entertainment','PC','assets/juegos/Accion/hitman.jpg',1);";
  insertJuego3: string = "INSERT or IGNORE INTO Juego VALUES(11,'Lost Ark','2022-03-31','Embárcate en una odisea en el gigantesco y vibrante mundo de Lost Ark: explora lugares desconocidos, busca tesoros perdidos y ponte a prueba con la emocionante acción y combate de este RPG de acción gratuito.','Amazon Games','PC','assets/juegos/Accion/lostark.jpg',1);";
  //JUEGOS DE AVENTURA
  insertJuego4: string = "INSERT or IGNORE INTO Juego VALUES(12,'New World','2021-09-28','Explora un emocionante MMO de mundo abierto repleto de peligros y oportunidades en el que forjarás un nuevo destino en la isla sobrenatural de Aetérnum.','Amazon Games','PC','assets/juegos/Aventura/newworld.jpg',2);";
  insertJuego5: string = "INSERT or IGNORE INTO Juego VALUES(13,'Red Dead Redemption 2','2019-12-05','Con más de 175 premios al Juego del año y más de 250 valoraciones perfectas, Red Dead Redemption 2 es la épica historia de Arthur Morgan y la banda de Van der Linde, que huyen por toda América en el albor de una nueva era. También incluye acceso al mundo multijugador compartido de Red Dead Online.','Rockstar Games','PC/PS4/PS5','assets/juegos/Aventura/reddead.jpg',2);";
  insertJuego6: string = "INSERT or IGNORE INTO Juego VALUES(14,'The Elder Scrolls V: Skyrim Special Edition','2016-10-27','Skyrim Special Edition, ganador de más de 200 premios al Juego del año da vida a la fantasía épica con un nivel de detalle asombroso. La Special Edition incluye el juego aclamado por la crítica y los complementos, así como nuevas características: gráficos y efectos renovados, rayos crepusculares volumétricos, reflejos en tiempo real, profundidad de campo dinámica y muchas más. Además, Skyrim Special Edition lleva todo el poder de los mods a PC y Xbox One: nuevas misiones, entornos, personajes, diálogos, armaduras y armas, entre otras muchas cosas. ¡Con los mods, la experiencia no tiene límites!','Bethesda Softworks','PC','assets/juegos/Aventura/skyrim.jpg',2);";
  //JUEGOS DE BATTLE ROYALE
  insertJuego7: string = "INSERT or IGNORE INTO Juego VALUES(15,'Apex Legends™','2020-11-05','Domina con estilo en Apex Legends, un juego gratuito de acción en primera persona, donde personajes legendarios con poderosas habilidades forman equipos para luchar y lograr fortuna y gloria en los confines de la Frontera.','Electronic Arts','PC/PS4','assets/juegos/Battleroyale/apexleg.jpg',3);";
  insertJuego8: string = "INSERT or IGNORE INTO Juego VALUES(16,'NARAKA: BLADEPOINT','2021-08-11','NARAKA: BLADEPOINT es una experiencia de combate y acción para hasta 60 jugadores con enfrentamientos cuerpo a cuerpo basados en las artes marciales, movimientos que desafían la gravedad, héroes personalizables dotados de habilidades épicas y un granarsenal de armas de corta y larga distancia...','NetEase Games Montréal','PC','assets/juegos/Battleroyale/naraka.jpg',3);";
  insertJuego9: string = "INSERT or IGNORE INTO Juego VALUES(17,'PUBG: BATTLEGROUNDS','2017-12-21','PLAYERUNKNOWN’S BATTLEGROUNDS es un shooter basado en el modo BattleRoyale que está siendo desarrollado a través de la retroalimentación con la comunidad. Comenzando de la nada, los usuarios tienen que luchar uno contra el otro para localizar armas y suministros para ser el único...','KRAFTON, Inc.','PC','assets/juegos/Battleroyale/pubg.jpg',3);";
  //JUEGOS DE CARRERAS
  insertJuego10: string = "INSERT or IGNORE INTO Juego VALUES(18,'Assetto Corsa Competizione','2019-05-29','Assetto Corsa Competizione es el nuevo juego oficial de la Blancpain GT Series. La excelente simulación del juego te permitirá experimentar la auténtica atmósfera de un campeonato homologado por la FIA GT3, en el que te enfrentarás a circuitos, vehículos, equipos y pilotos oficiales.','505 Games','PC','assets/juegos/carreras/assettocorsa.jpg',4);";
  insertJuego11: string = "INSERT or IGNORE INTO Juego VALUES(19,'DIRT 5','2020-11-05','Suéltate en DIRT 5: la experiencia todoterreno más audaz de todos los tiempos, con un modo Carrera plagado de estrellas, pantalla dividida para cuatro jugadores, innovadores modos en línea, editor de diseños distintivos y mucho más.','Codemasters, Electronic Arts','PC','assets/juegos/carreras/dirt5.jpg',4);";
  insertJuego12: string = "INSERT or IGNORE INTO Juego VALUES(20,'Need for Speed™ Heat','2019-11-08','No pares por el día y arriésgalo todo por la noche en Need for Speed™ Heat Deluxe Edition, un juego de carreras callejeras dinámico donde los límites de la ley se desvanecen cuando empieza a anochecer.','Electronic Arts','PC','assets/juegos/carreras/nfsheat.jpg',4);";
  //JUEGOS DE SHOOTER
  insertJuego13: string = "INSERT or IGNORE INTO Juego VALUES(21,'Insurgency: Sandstorm','2018-12-12','Insurgency: Sandstorm es un FPS táctico por equipos basado en combates letales en espacios reducidos y multijugador centrado en objetivos. Experimenta la intensidad del combate moderno, en el que se premia la pericia y se gana sabiendo jugar en equipo.','Focus Home Interactive','PC','assets/juegos/Shooter/insurgency.jpg',5);";
  insertJuego14: string = "INSERT or IGNORE INTO Juego VALUES(22,'PAYDAY 2','2013-08-13','PAYDAY 2 es un juego de acción cooperativo para cuatro jugadores que, una vez más, permite a los jugadores ponerse en la piel del equipo original de PAYDAY - Dallas, Hoxton, Wolf y Chains - mientras descienden por Washington DC en una épica ola de crímenes.','Starbreeze Publishing AB','PC/PS3','assets/juegos/Shooter/payday2.jpg',5);";
  insertJuego15: string = "INSERT or IGNORE INTO Juego VALUES(23,'Tom Clancys Rainbow Six® Siege','2015-12-01','Domina el arte de la destrucción y el uso de dispositivos en Tom Clancys Rainbow Six Siege. Enfréntate a un combate intenso de rango cercano altamente letal, con decisiones tácticas, juego en equipo y una acción explosiva en todo momento. Vive un nuevo estilo de tiroteos y estrategia nacida en el seno del rico legado de los anteriores juegos Tom Clancys Rainbow Six.','Ubisoft','PC','assets/juegos/Shooter/rainbow.jpg',5);";

  //RESENNIA
  crearResennia: string = "CREATE TABLE IF NOT EXISTS Resennia ( id_resennia INTEGER PRIMARY KEY autoincrement, resennia VARCHAR2(200) NOT NULL, fecha_resennia DATE NOT NULL, usuario_id_rut VARCHAR2(20) NOT NULL, juego_id_juego INTEGER NOT NULL, FOREIGN KEY(usuario_id_rut) references Usuario(id_rut), FOREIGN KEY(juego_id_juego) references Juego(id_juego));";
  insertcoment1: string = "INSERT or IGNORE INTO Resennia VALUES(50,'Insurgency super bueno','2015-12-01','newmoss',21);";
  insertcoment2: string = "INSERT or IGNORE INTO Resennia VALUES(52,'Malo el payday','2015-12-01','newmoss',22);";
  insertcoment3: string = "INSERT or IGNORE INTO Resennia VALUES(53,'Tom Clancys ñeeeeee','2015-12-01','newmoss',23);";


  listaUsuario = new BehaviorSubject([]);

  usuario = new BehaviorSubject([]);

  juego = new BehaviorSubject([]);

  resennia = new BehaviorSubject([]);

  resinner = new BehaviorSubject([]);

  accion = new BehaviorSubject([]);
  aventura = new BehaviorSubject([]);
  battleroyale = new BehaviorSubject([]);
  carrera = new BehaviorSubject([]);
  shooter = new BehaviorSubject([]);

  usuarioLogeado = new BehaviorSubject([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router, public loadingController: LoadingController, public toastController: ToastController, private sqlite: SQLite, private platform: Platform, public alertController: AlertController) {
    this.crearBD();
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'bdtest.db',
        location: 'default'

      }).then((db: SQLiteObject) => {
        this.database = db;
        //this.presentAlert("BD Creada");
        //llamamos a la creación de tablas
        this.crearTablas();
      }).catch(e => this.presentAlert(e));
    })
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.crearTipoUsuario, []);
      await this.database.executeSql(this.crearUsuario, []);
      await this.database.executeSql(this.crearJuego, []);
      await this.database.executeSql(this.insertAdmin, []);
      await this.database.executeSql(this.insertCliente, []);
      await this.database.executeSql(this.insertUser, []);
      await this.database.executeSql(this.insertUsernormal, []);

      //CATEGORIA E INSERT
      await this.database.executeSql(this.crearCategoria, []);
      await this.database.executeSql(this.insertAcc, []);
      await this.database.executeSql(this.insertAv, []);
      await this.database.executeSql(this.insertBr, []);
      await this.database.executeSql(this.insertCar, []);
      await this.database.executeSql(this.insertSho, []);

      //JUEGOS DE ACCIÓN
      await this.database.executeSql(this.insertJuego1, []);
      await this.database.executeSql(this.insertJuego2, []);
      await this.database.executeSql(this.insertJuego3, []);
      //JUEGOS DE AVENTURA
      await this.database.executeSql(this.insertJuego4, []);
      await this.database.executeSql(this.insertJuego5, []);
      await this.database.executeSql(this.insertJuego6, []);
      //JUEGOS DE BATTLE-ROYALE
      await this.database.executeSql(this.insertJuego7, []);
      await this.database.executeSql(this.insertJuego8, []);
      await this.database.executeSql(this.insertJuego9, []);
      //JUEGOS DE CARRERAS
      await this.database.executeSql(this.insertJuego10, []);
      await this.database.executeSql(this.insertJuego11, []);
      await this.database.executeSql(this.insertJuego12, []);
      //JUEGOS SHOOTER
      await this.database.executeSql(this.insertJuego13, []);
      await this.database.executeSql(this.insertJuego14, []);
      await this.database.executeSql(this.insertJuego15, []);
      //RESENNIA
      await this.database.executeSql(this.crearResennia, []);
      await this.database.executeSql(this.insertcoment1, []);
      await this.database.executeSql(this.insertcoment2, []);
      await this.database.executeSql(this.insertcoment3, []);

      //this.presentAlert("Creo la Tabla");
      this.buscar();
      this.buscarGame();
      this.login('', '');
      this.buscarResennia();
      this.isDbReady.next(true);
    } catch (e) {
      this.presentAlert("error creartabla " + e);
    }
  }

  buscar() {
    //this.presentAlert("a");
    return this.database.executeSql('SELECT * FROM Usuario', []).then(res => {
      let items: Usuario[] = [];
      //this.presentAlert("b");
      if (res.rows.length > 0) {
        //this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          //this.presentAlert("d");
          items.push({
            id_rut: res.rows.item(i).id_rut,
            nombres: res.rows.item(i).nombres,
            apellidos: res.rows.item(i).apellidos,
            fecha_nac: res.rows.item(i).fecha_nac,
            email: res.rows.item(i).email,
            nickname: res.rows.item(i).nickname,
            password: res.rows.item(i).password,
            id_tipo_user: res.rows.item(i).id_tipo_user,
            status: res.rows.item(i).status,

          });
        }
      }
      //this.presentAlert("d");
      this.listaUsuario.next(items);
    });
  }
  fetchUsuario(): Observable<Usuario[]> {
    return this.listaUsuario.asObservable();
  }

  validarCuenta(id_rut, nombres, apellidos, fecha_nac, email, nickname, password, id_tipo_user, status) {
    let data = [id_rut, nombres, apellidos, fecha_nac, email, nickname, password, id_tipo_user, status];
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      let contador = 0
      // this.presentAlert("b");
      if (res.rows.length > 0) {
        // this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          // this.presentAlert("d");
          if (res.rows.item(i).id_rut == id_rut || res.rows.item(i).email == email || res.rows.item(i).nickname == nickname) {
            contador = +1;
          }
        }
      }
      if (contador == 0) {
        this.addUsuario(data)
      }
      else {
        this.presentAlert('Ya existe una cuenta con el mismo rut, nickname u email. Intente nuevamente');
      }
    });
  }
  addUsuario(data) {
    return this.database.executeSql('INSERT OR IGNORE INTO usuario (id_rut, nombres, apellidos, fecha_nac, email, nickname, password, id_tipo_user, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(res => {
      this.buscar();
      console.log("usuario creado");
    })
  }

  //para listado
  fetchsuario(): Observable<Usuario[]> {
    return this.usuario.asObservable();
  }

  // VALIDACION SI EXISTE EL USUARIO EN BD

  login(nick, pass) {
    let data = [nick, pass]
    return this.database.executeSql('SELECT id_rut FROM Usuario WHERE nickname = ? AND password = ?', [data[0], data[1]]).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.usuarioActivo(nick)
          this.obtenerUsuarioActivo()
          items.push({
            id_rut: res.rows.item(i).id_rut,
            nombres: res.rows.item(i).nombres,
            apellidos: res.rows.item(i).apellidos,
            fecha_nac: res.rows.item(i).fecha_nac,
            email: res.rows.item(i).email,
            nickname: res.rows.item(i).nickname,
            password: res.rows.item(i).password,
            id_tipo_user: res.rows.item(i).id_tipo_user,
            status: res.rows.item(i).status,
          });
        }
        this.presentLoading('Iniciado sesión..');
        setTimeout(() => {
          this.presentToast("Bienvenido a Playtoolash " + nick);
          this.router.navigate(['/home']);
        },
          2000
        )
      }
      this.usuario.next(items);
    });
  }

  // USUARIO ACTIVO

  usuarioActivo(nick) {
    this.inactivo()
    return this.database.executeSql('UPDATE usuario SET status = 1 WHERE nickname = ?', [nick])
      .then(_ => {
        this.buscar();
      });
  }
  inactivo() {
    this.database.executeSql('UPDATE usuario SET status = 0', [])
      .then(_ => {
        this.buscar();
      });
  }
  cerrarSesion(nick) {
    return this.database.executeSql('UPDATE usuario SET status = 0 WHERE nickname = ?', [nick])
      .then(_ => {
        this.buscar();
      });
  }
  obtenerUsuarioActivo() {
    return this.database.executeSql('SELECT * from usuario WHERE status = ?', [1]).then(res => {
      let items: Usuario[] = [];
      items.push({
        id_rut: res.rows.item(0).id_rut,
        nombres: res.rows.item(0).nombres,
        apellidos: res.rows.item(0).apellidos,
        fecha_nac: res.rows.item(0).fecha_nac,
        email: res.rows.item(0).email,
        nickname: res.rows.item(0).nickname,
        password: res.rows.item(0).password,
        id_tipo_user: res.rows.item(0).id_tipo_user,
        status: res.rows.item(0).status,
      });
      this.usuarioLogeado.next(items);
      console.log(items)
    });
  }
  fetchUsuarioLogeado(): Observable<Usuario[]> {
    return this.usuarioLogeado.asObservable();
  }

  // ELIMINAR CUENTA U USUARIO

  deleteUsuario(id) {
    return this.database.executeSql('DELETE FROM Usuario WHERE id_rut = ?', [id])
      .then(_ => {
        this.buscar();
      });
  }
  updateUsuario(rut, id_tipo_user) {
    let data = [id_tipo_user, rut];
    return this.database.executeSql('UPDATE Usuario SET id_tipo_user = ? WHERE id_rut = ?', data)
      .then(data => {
        this.buscar();
      })
  }

  // CAMBIAR CONTRASEÑA EN PERFIL 
  validarPass(password) {
    return this.database.executeSql('SELECT password FROM usuario WHERE status = 1', []).then(res => {
      let estado = 0
      if (res.rows.length > 0) {
        // this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          if (password == res.rows.item(i).password) {
            estado = 0;
            break;
          }
          if (password != res.rows.item(i).password) {
            estado = 1;
          }
        }
      }
      return estado;
    })
  }
  updatePass(password) {
    return this.database.executeSql('UPDATE usuario SET password = ? WHERE status = 1', [password])
      .then(_ => {
        this.buscar();
        this.obtenerUsuarioActivo();
      });
  }

  //GAME

  addGame(nombre, fecha_lanz, descripcion, editor, plataforma, imagen, id_categoria) {
    let data = [nombre, fecha_lanz, descripcion, editor, plataforma, imagen, id_categoria];
    return this.database.executeSql('INSERT INTO juego ( nombre, fecha_lanz,descripcion,editor,plataforma,imagen,id_categoria) VALUES ( ?, ?, ?, ?, ?, ?, ?)', data).then(_ => {
      this.buscarGame();
    });
  }
  buscarGame() {
    //this.presentAlert("a");
    return this.database.executeSql('SELECT * FROM juego ORDER BY id_juego DESC', []).then(res => {
      let items: Juego[] = [];
      //this.presentAlert("b");
      if (res.rows.length > 0) {
        //this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          //this.presentAlert("d");
          items.push({
            id_juego: res.rows.item(i).id_juego,
            nombre: res.rows.item(i).nombre,
            fecha_lanz: res.rows.item(i).fecha_lanz,
            descripcion: res.rows.item(i).descripcion,
            editor: res.rows.item(i).editor,
            plataforma: res.rows.item(i).plataforma,
            imagen: res.rows.item(i).imagen,
            id_categoria: res.rows.item(i).id_categoria,
          });
        }
      }
      //this.presentAlert("d");
      this.juego.next(items);
      this.buscarAccion();
      this.buscarAventura();
      this.buscarBattleroyale();
      this.buscarCarrera();
      this.buscarShooter();
    });
  }

  fetchJuego(): Observable<Juego[]> {
    return this.juego.asObservable();
  }
  fetchJuegoAccion(): Observable<Juego[]> {
    return this.accion.asObservable();
  }
  fetchJuegoAventura(): Observable<Juego[]> {
    return this.aventura.asObservable();
  }
  fetchJuegoBattleroyale(): Observable<Juego[]> {
    return this.battleroyale.asObservable();
  }
  fetchJuegoCarrera(): Observable<Juego[]> {
    return this.carrera.asObservable();
  }
  fetchJuegoShooter(): Observable<Juego[]> {
    return this.shooter.asObservable();
  }

  deleteJuego(id) {
    return this.database.executeSql('DELETE FROM Juego WHERE nombre = ?', [id])
      .then(_ => {
        this.buscarGame();
      });
  }
  updateJuego(id, nombre, fecha, descripcion, editor, plataforma, imagen, id_categoria) {
    let data = [nombre, fecha, descripcion, editor, plataforma, imagen, id_categoria, id];
    return this.database.executeSql('UPDATE Juego SET nombre = ?, fecha_lanz = ?, descripcion = ?, editor = ?, plataforma = ?, imagen = ? , id_categoria = ? WHERE id_juego = ?', data)
      .then(data => {
        this.buscarGame();
      })
  }
  buscarAccion() {
    return this.database.executeSql('SELECT * FROM juego where id_categoria = ?', ['1']).then(res => {
      let items: Juego[] = [];
      // this.presentAlert("b");
      if (res.rows.length > 0) {
        // this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          // this.presentAlert("d");
          items.push({
            id_juego: res.rows.item(i).id_juego,
            nombre: res.rows.item(i).nombre,
            fecha_lanz: res.rows.item(i).fecha_lanz,
            descripcion: res.rows.item(i).descripcion,
            editor: res.rows.item(i).editor,
            plataforma: res.rows.item(i).plataforma,
            imagen: res.rows.item(i).imagen,
            id_categoria: res.rows.item(i).id_categoria,
          });
        }
      }
      // this.presentAlert("d");
      this.accion.next(items);
    });
  }
  buscarAventura() {
    return this.database.executeSql('SELECT * FROM juego where id_categoria = ?', ['2']).then(res => {
      let items: Juego[] = [];
      // this.presentAlert("b");
      if (res.rows.length > 0) {
        // this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          // this.presentAlert("d");
          items.push({
            id_juego: res.rows.item(i).id_juego,
            nombre: res.rows.item(i).nombre,
            fecha_lanz: res.rows.item(i).fecha_lanz,
            descripcion: res.rows.item(i).descripcion,
            editor: res.rows.item(i).editor,
            plataforma: res.rows.item(i).plataforma,
            imagen: res.rows.item(i).imagen,
            id_categoria: res.rows.item(i).id_categoria,
          });
        }
      }
      // this.presentAlert("d");
      this.aventura.next(items);
    });
  }
  buscarBattleroyale() {
    return this.database.executeSql('SELECT * FROM juego where id_categoria = ?', ['3']).then(res => {
      let items: Juego[] = [];
      // this.presentAlert("b");
      if (res.rows.length > 0) {
        // this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          // this.presentAlert("d");
          items.push({
            id_juego: res.rows.item(i).id_juego,
            nombre: res.rows.item(i).nombre,
            fecha_lanz: res.rows.item(i).fecha_lanz,
            descripcion: res.rows.item(i).descripcion,
            editor: res.rows.item(i).editor,
            plataforma: res.rows.item(i).plataforma,
            imagen: res.rows.item(i).imagen,
            id_categoria: res.rows.item(i).id_categoria,
          });
        }
      }
      // this.presentAlert("d");
      this.battleroyale.next(items);
    });
  }
  buscarCarrera() {
    return this.database.executeSql('SELECT * FROM juego where id_categoria = ?', ['4']).then(res => {
      let items: Juego[] = [];
      // this.presentAlert("b");
      if (res.rows.length > 0) {
        // this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          // this.presentAlert("d");
          items.push({
            id_juego: res.rows.item(i).id_juego,
            nombre: res.rows.item(i).nombre,
            fecha_lanz: res.rows.item(i).fecha_lanz,
            descripcion: res.rows.item(i).descripcion,
            editor: res.rows.item(i).editor,
            plataforma: res.rows.item(i).plataforma,
            imagen: res.rows.item(i).imagen,
            id_categoria: res.rows.item(i).id_categoria,
          });
        }
      }
      // this.presentAlert("d");
      this.carrera.next(items);
    });
  }
  buscarShooter() {
    return this.database.executeSql('SELECT * FROM juego where id_categoria = ?', ['5']).then(res => {
      let items: Juego[] = [];
      // this.presentAlert("b");
      if (res.rows.length > 0) {
        // this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          // this.presentAlert("d");
          items.push({
            id_juego: res.rows.item(i).id_juego,
            nombre: res.rows.item(i).nombre,
            fecha_lanz: res.rows.item(i).fecha_lanz,
            descripcion: res.rows.item(i).descripcion,
            editor: res.rows.item(i).editor,
            plataforma: res.rows.item(i).plataforma,
            imagen: res.rows.item(i).imagen,
            id_categoria: res.rows.item(i).id_categoria,
          });
        }
      }
      // this.presentAlert("d");
      this.shooter.next(items);
    });
  }

  // RESENNIA

  addResennia(resennia, fecha_resennia, usuario_id_rut, juego_id_juego) {
    let data = [resennia, fecha_resennia, usuario_id_rut, juego_id_juego];
    return this.database.executeSql('INSERT INTO Resennia ( resennia, fecha_resennia,usuario_id_rut,juego_id_juego) VALUES ( ?, ?, ?, ?)', data).then(_ => {
      this.buscarResennia();
      console.log(data)
      this.presentAlert('Reseña publicada')
    });
  }
  buscarResennia() {
    //this.presentAlert("a");
    return this.database.executeSql('SELECT * FROM Resennia ORDER BY id_resennia DESC', []).then(res => {
      let items: Resennia[] = [];
      //this.presentAlert("b");
      if (res.rows.length > 0) {
        //this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          //this.presentAlert("d");
          items.push({
            id_resennia: res.rows.item(i).id_resennia,
            resennia: res.rows.item(i).resennia,
            fecha_resennia: res.rows.item(i).fecha_resennia,
            juego_id_juego: res.rows.item(i).juego_id_juego,
            usuario_id_rut: res.rows.item(i).usuario_id_rut,
          });
        }
      }
      //this.presentAlert("d");
      this.resennia.next(items);
    });
  }
  fetchResennia(): Observable<Resennia[]> {
    return this.resennia.asObservable();
  }
  deleteResennia(id) {
    return this.database.executeSql('DELETE FROM Resennia WHERE id_resennia = ?', [id]).then(_ => {
      this.buscarResennia();
    });
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: '',
      message: mensaje,
      buttons: ['Cerrar']
    });

    await alert.present();
  }

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        cssClass: '.toast-wrapper.toast-bottom',
        message: message,
        position: 'bottom',
        duration: duration ? duration : 2000,
        color:'light'
      }
    );
    toast.present();
  }
  async presentLoading(msj) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: msj,
      duration: 1900
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}