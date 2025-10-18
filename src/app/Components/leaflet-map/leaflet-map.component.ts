import { Component, DestroyRef, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapUnit } from '../../Models/map-marker';
import { MapUnits } from '../../Helpers/map-units.helper';
import { MapControllerService } from '../../Services/map-controller.service';
import { interval} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss'
})
export class LeafletMapComponent implements OnInit {
  mapUnits: MapUnit[] = [];

  options: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 6,
    center: L.latLng(30.0444, 31.2357)
  };

  constructor(private mapSer: MapControllerService, private destroyRef: DestroyRef){}

  ngOnInit(){
    this.mapUnits = this.mapSer.mapUnits
  }

  onMapReady(map: L.Map) {
    this.mapSer.map = map;
    this.addMarkersToMap();
    this.onMapUnitsMove();
  }

  addMarkersToMap() {
    this.mapUnits.forEach(mapUnit => {
     const icon = mapUnit.icon
       mapUnit.marker = L.marker([mapUnit.lat, mapUnit.lng], {icon})
        .bindPopup(`
          <b>${mapUnit.name}</b><br>
          <b>ID: ${mapUnit.id}</b><br>
          <b>Lat: ${mapUnit.lat}</b><br>
          <b>Lng: ${mapUnit.lng}</b><br>
          `)
        .addTo(this.mapSer.map)
    });
  }

onMapUnitsMove() {
    for (let i = 0; i < this.mapUnits.length; i++) {
      let mapUnit = this.mapUnits[i];
      let randomTime = 2000 + Math.random() * 3000;
      
      interval(randomTime).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        mapUnit.lat = mapUnit.lat + (Math.random() - 0.5) * 0.1;
        mapUnit.lng = mapUnit.lng + (Math.random() - 0.5) * 0.1;
        mapUnit.marker?.setLatLng([mapUnit.lat, mapUnit.lng]);
      });
    }
  }

   onSelectUnit(mapUnit: MapUnit) {
    this.mapSer.onSelectUnit(mapUnit);
  }

}
