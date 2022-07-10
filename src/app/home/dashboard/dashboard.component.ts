import { Component, OnInit, OnDestroy ,AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';

import { ViewChild, ElementRef } from "@angular/core";
import { of, forkJoin } from 'rxjs';
import { MainServiceService } from '../../main-service.service';
import { Mainclass, statusParams, statusInterfaceParams, findStatus } from '../../mainclass';

declare let L: any;
export interface _device {
  deviceId: string;
  ignitionStatus: string;
  latitude: number;
  longitude: number;
  odometer: number;
  region: string;
  reportedMilliSeconds: number;
  reportedTime: string;
  speed: number
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[MainServiceService]
})
export class DashboardComponent implements OnInit,AfterViewInit {
  // streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   detectRetina: true,
  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  // });
  constructor(public mservice: MainServiceService) { 
    
  }
  myMap: any;
  dataSet = [];
  interVal;

  // home starts
  propertyList = [];
  public folder: string;
  display: boolean = false;
  display2: boolean = false;
  updateAction: statusInterfaceParams = new statusParams();

  // vehice list 
  listOverview: any;
  dummyListArr: any = []// dummy
  public dummyHeader = new Mainclass().vehicleHeader;
  fromNam;
  toNam;
  imeiNum: any = '';
  ngOnInit() {
    this.interVal = setInterval(() => {
      this.updateAction.response=[];
      this.loadLoc();
    }, 5000);
  }
  ngAfterViewInit(): void {
    var mapOptions = {
      center: [17.385044, 78.486671],
      zoom: 4
    }
    this.myMap = new L.map('newMap', mapOptions);
    var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    this.myMap.addLayer(layer);
   
  }

  loadLoc() {
    
    this.mservice.getDetailsByLoc({ name: 'chennai' }).subscribe(response => {
      if (response) {
        // console.log(response)

        let index=this.updateAction.response.findIndex((item:_device)=>{
          return item.deviceId==response.deviceId;
        })
        if(index==-1){
          this.updateAction.response.push(response)
        }else{

          // update
          this.updateAction.response[index]=response;

        }
        
        
        // this.updateAction.response=response;
        this.loadmap()
      }
    })
  }

  loadmap() {
    
    if (this.updateAction.response) {


      let mIndex = 0;
      this.dataSet =this.updateAction.response.map(res => {
          return res;
        })
      // this.dataSet = this.updateAction.response.filter(res => {
      //   return this.imeiNum ? res.deviceId == this.imeiNum : res;
      // })
      // this.listOverview = new findStatus(this.dataSet);
      // this.dataSet.forEach((a, i) => {

       
      //   a.myOrigin;
      //   a.myDestination;
      //   a.myOrigin = { lat: this.dataSet[mIndex].latitude, lng: this.dataSet[mIndex].longitude };
      //   let latDst;
      //   let lngDst
      //   if ((this.dataSet[mIndex + 1] && this.dataSet[mIndex + 1].latitude) && (this.dataSet[mIndex + 1] && this.dataSet[mIndex + 1].longitude)) {
      //     latDst = this.dataSet[mIndex + 1].latitude;
      //     lngDst = this.dataSet[mIndex + 1].longitude;
      //   } else if (!this.dataSet[mIndex + 1]) {
      //     latDst = this.dataSet[mIndex].latitude;
      //     lngDst = this.dataSet[mIndex].longitude;
      //   }
      //   a.myDestination = { lat: latDst, lng: lngDst };
      //   mIndex++;
      // });
      // console.log(this.dataSet)


     
      // set marker
      let nIndex:any = 0;

      for (let a of this.dataSet) {
        console.log(a)
        var deviceIcon = L.icon({
          iconUrl: 'assets/vts.png',
          shadowUrl: a.ignitionStatus == 'OFF' ? 'assets/ignition-off.png' : '',

          iconSize: [38, 55], // size of the icon
          shadowSize: [32, 34], // size of the shadow
          iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 107],  // the same for the shadow
          popupAnchor: [-13, -76] // point from which the popup should open relative to the iconAnchor
        });
        let marker = L.marker([a.latitude, a.longitude], { icon: deviceIcon })
          .bindPopup(a.deviceId).addTo(this.myMap);
        // set latest lat,lng once initialy
        // if (!this.isCitySelected) {
          this.myMap.panTo(new L.LatLng(a.latitude, a.longitude));
          this.myMap.setZoom(16);

        // }
        
        nIndex++;

      }
     



      
      // this.getLatLng();

      // if polygon selected
      if (this.imeiNum) {
        // this.getPolygonByDeviceId()
      }
    }
  }
}
