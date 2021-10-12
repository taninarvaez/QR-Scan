import { Injectable } from '@angular/core';
import { Registro } from '../models/historial.models';
import { Storage } from '@ionic/storage-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  registros: Registro[] = [];

  constructor(
    private storage: Storage,
    private iab: InAppBrowser,
    private nav: NavController
  ) {
    //crear store
    this.storage.create();
    this.cargarRegistros();
  }

  async cargarRegistros() {
    //leer storage
    this.registros = await this.storage.get('historial') || [];
  }

  async guardarRegistro(format: string, texto: string) {
    await this.cargarRegistros();
    const nuevoRegistro = new Registro(format, texto);
    this.registros.unshift(nuevoRegistro);
    console.log(this.registros);
    //guardar en storage
    this.storage.set('historial', this.registros);
    this.abrirRegistro(nuevoRegistro);
  }

  abrirRegistro(registro: Registro) {
    this.nav.navigateForward('/tabs/tab2');

    switch (registro.type) {
      case "http":
        const browser = this.iab.create(registro.texto, '_system');
        console.log(browser);
        break;
      case "geo:":
        this.nav.navigateForward(`/tabs/tab3/${registro.texto}`)
        console.log(registro.texto);
        break;
      default:
        console.log("Trabajando en el sms");
    }
  }
}

