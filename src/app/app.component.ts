import { Component } from '@angular/core';
import { MapDashboardComponent } from "./Pages/map-dashboard/map-dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AfaqyInterview';
}
