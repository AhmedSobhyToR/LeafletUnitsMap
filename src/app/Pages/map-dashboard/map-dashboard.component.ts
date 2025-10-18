import { Component } from '@angular/core';
import { UnitListOverlayComponent } from "../../Components/unit-list-overlay/unit-list-overlay.component";
import { LeafletMapComponent } from "../../Components/leaflet-map/leaflet-map.component";

@Component({
  selector: 'app-map-dashboard',
  standalone: true,
  imports: [UnitListOverlayComponent, LeafletMapComponent],
  templateUrl: './map-dashboard.component.html',
  styleUrl: './map-dashboard.component.scss'
})
export class MapDashboardComponent {

}
