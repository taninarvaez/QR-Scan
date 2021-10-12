import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import * as Mapboxgl from 'Mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  lat: number;
  lng: number;

  constructor(
    public datalocal: DataLocalService,
    private route: ActivatedRoute
  ) { }

  mapa: Mapboxgl.Map;

  ejecutarRegistro(registro) {
    this.datalocal.abrirRegistro(registro);
  }

  ngOnInit() {

    let geo: any = this.route.snapshot.paramMap.get('geo');

    geo = geo.substr(4);
    geo = geo.split(',');

    this.lat = Number(geo[0]);
    this.lng = Number(geo[1]);

    Mapboxgl.accessToken = environment.mapboxKey;

    this.mapa = new Mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [this.lng, this.lat], // starting position
      zoom: 17
    });
    this.crearMarcador(this.lng, this.lat);
  }

  crearMarcador(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([lng, lat])
      .addTo(this.mapa);

    marker.on('drag', () => {
      console.log(marker.get);
    })
  }
}
