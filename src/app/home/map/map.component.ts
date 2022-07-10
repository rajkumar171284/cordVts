import { Component, OnInit, DoCheck,AfterViewInit, Output,EventEmitter,OnDestroy, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { forkJoin, interval, Subscription } from 'rxjs';
import { MainServiceService } from '../../main-service.service';
import { Mainclass, statusParams, statusInterfaceParams, findStatus } from '../../mainclass';
declare let $: any;

declare let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges,DoCheck, OnDestroy {

  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  @Input() WIDGET_REQUEST: any;
  labelMessage: any;
  labelMessage2: any;
  deviceType: string = '';
  markerArr: any = [];
  myMap: any;
  defaultLat: any = 11.505;
  defaultLng: any = -0.09;
  cityLocations: any = [];
  isCitySelected = false;
  setInterval: Subscription | undefined;
  @Output() _widgetData = new EventEmitter();
  @Input() widgetIndex: any;
  public height: any;
  public width: any;
  constructor(public dataService: MainServiceService, private ref: ChangeDetectorRef) { }
  ngDoCheck(): void {
    // console.log('dochk', this.widgetIndex);
    // this.getWidgetdetails();
    const id = this.widgetIndex.toString();
    let that = this;
    
    let x=document.getElementById(id);
    // console.log(id,doc,document.getElementById(id))
      $(x).resizable({
        stop: function (event: Event, ui: any) {
          console.log(ui)
          that.height = $(ui.size.height)[0];
          that.width = $(ui.size.width)[0];
          const params: any = {
            width: that.width, height: that.height
          }
          that.WIDGET_REQUEST.WIDGET_SIZE = JSON.stringify(params);
        }
      });
  }
  ngOnInit(): void {
  
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.WIDGET_REQUEST) {
      this.WIDGET_REQUEST.WIDGET_DATA = this.WIDGET_REQUEST.WIDGET_DATA.toUpperCase();
      // console.log('map req:', this.WIDGET_REQUEST)

      // this.getAllDevice();
    }
  }
  ngAfterViewInit(): void {
    var mapOptions = {
      center: [17.385044, 78.486671],
      zoom: 4
    }
    this.myMap = new L.map('map', mapOptions);
    var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    this.myMap.addLayer(layer);
    // this.myMap = L.map('map').setView([this.defaultLat, this.defaultLng], 5);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 8,
    //   attribution: '© OpenStreetMap'
    // }).addTo(this.myMap);
  }
 
  showByCity(a: any) {
    if (a) {

      for (let item of this.cityLocations) {
        item.isSelected = false;
      };
      const index = this.cityLocations.findIndex((item: any) => {
        return item.LOCATION == a.LOCATION;
      })
      if (index != -1) {
        this.cityLocations[index].isSelected = true;
      }
      this.isCitySelected = true;
      const city = this.markerArr.filter((item: any) => {
        return item.region.toUpperCase() == a.LOCATION;
      })
      this.myMap.panTo(new L.LatLng(city[0].latitude, city[0].longitude));
      this.myMap.setZoom(16);
    }

  }
 



  

  ngOnDestroy(): void {
    this.setInterval?.unsubscribe();
  }
  getProp(type:string){
    const prop =JSON.parse(this.WIDGET_REQUEST.WIDGET_SIZE)
    if(type=='W'){
       return prop.width
    }
    if(type=='H'){
      return prop.height
    }
  }
  saveWidget() {

    this._widgetData.emit(this.WIDGET_REQUEST)
  }
}
