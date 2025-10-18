import { Component, DestroyRef, OnInit } from '@angular/core';
import { MapUnit } from '../../Models/map-marker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MapControllerService } from '../../Services/map-controller.service';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-unit-list-overlay',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './unit-list-overlay.component.html',
  styleUrl: './unit-list-overlay.component.scss'
})
export class UnitListOverlayComponent implements OnInit {
  mapUnits: MapUnit[] = [];
  filteredMapUnits: MapUnit[] = [];
  selectedUnit!: MapUnit;
  isExpanded: boolean = true;

  // NgModel could be used to connect with HTML
  searchForm: FormGroup = new FormGroup({
    searchedUnit: new FormControl(null)
  })

  constructor(private mapSer: MapControllerService
    , private destroyRef: DestroyRef) { }

  ngOnInit() {
    this.mapUnits = this.mapSer.mapUnits;
    this.filteredMapUnits = this.mapUnits;
    // debounceTime to wait for 300 ms before subscribing and searching for the unit
    // takeUntilDestroyed to destroy all subscribtions when the component is destroyed
    this.searchedUnit?.valueChanges.pipe(debounceTime(300),takeUntilDestroyed(this.destroyRef)).subscribe({
      next:()=> this.onUnitChange()
    })
  }

  onUnitChange() {
    this.filteredMapUnits = this.mapUnits;

    this.filteredMapUnits = this.filteredMapUnits.filter(unit =>
      unit.name.toLowerCase().includes(this.searchedUnit?.value.toLowerCase()) ||
      unit.id.toString().includes(this.searchedUnit?.value)
    );

    this.mapUnits.forEach(unit => {
      if (this.filteredMapUnits.includes(unit)) {
        unit.marker?.addTo(this.mapSer.map);
      } else {
        unit.marker?.remove();
      }

    });
  }

  onSelectUnit(unit: MapUnit) {
    this.selectedUnit = unit;
    this.mapSer.onSelectUnit(unit)
  }

  // For a better user experience when the user clicks on Enter, it will choose the first unit
  onSearchSubmit() {
    if (this.filteredMapUnits.length > 0) {
    this.onSelectUnit(this.filteredMapUnits[0]);
  }
}

toggleUnitsList() {
  this.isExpanded = !this.isExpanded;
}

  get searchedUnit(){
    return this.searchForm.get('searchedUnit')
  }
}
