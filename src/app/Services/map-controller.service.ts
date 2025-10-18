import { Injectable } from '@angular/core';
import { MapUnit } from '../Models/map-marker';
import { MapUnits } from '../Helpers/map-units.helper';

@Injectable({
  providedIn: 'root'
})
export class MapControllerService {
  map!: L.Map;
  mapUnits: MapUnit[] = [];

  constructor() {
    this.mapUnits = MapUnits;
   }

// I could use Input/Output approach instead of creating a service
// By creating an Output EventEmitter whenever focusUnit gets called inside UnitListOverlay Component
// It will pass the Unit as parameter and it will be executed inside LeafletMap Component

    onSelectUnit(unit: MapUnit) {
    if (this.map && unit.marker) {
      this.map.setView([unit.lat, unit.lng], 10);
      unit.marker.openPopup();
    }
  }
}
