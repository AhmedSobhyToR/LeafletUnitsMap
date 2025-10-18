import {icon as LeafletIcon} from 'leaflet';

const iconObj = LeafletIcon({
    iconUrl:'/assets/images/map-marker-32px.png',
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
})

export const MapUnits = [
  { id: 1, name: 'First', lat: 30.0444, lng: 31.2357, icon: iconObj },
  { id: 2, name: 'Second', lat: 30.5, lng: 31.5, icon: iconObj },
  { id: 3, name: 'Third', lat: 29.8, lng: 31.0, icon: iconObj },
  { id: 4, name: 'Fourth', lat: 30.2, lng: 31.8, icon: iconObj },
  { id: 5, name: 'Fifth', lat: 29.9, lng: 31.3, icon: iconObj }
];
