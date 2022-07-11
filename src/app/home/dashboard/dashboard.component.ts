import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { ActionSheetController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ViewChild, ElementRef } from "@angular/core";
import { of, forkJoin, Subscription, interval } from 'rxjs';
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
  providers: [MainServiceService]
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  // streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   detectRetina: true,
  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  // });
  constructor(private platform: Platform, public mservice: MainServiceService, public actionSheetController: ActionSheetController) {

  }
  myMap: L.Map;
  dataSet = [];
  interVal;

  // home starts
  propertyList = [];
  public folder: string;
  display: boolean = false;
  display2: boolean = false;
  loadOnce: boolean = false;
  updateAction: statusInterfaceParams = new statusParams();

  // vehice list 
  listOverview: any;
  dummyListArr: any = []// dummy
  public dummyHeader = new Mainclass().vehicleHeader;
  fromNam;
  toNam;
  imeiNum: any = '';
  myLoc = 'chennai';
  subscription1: Subscription;
  subscription2: Subscription;

  ionViewDidEnter() { this.leafletMap(); }
  leafletMap() {
console.log('newMap')
    this.myMap = L.map('newMap').setView([28.644800, 77.216721], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.myMap);

    L.marker([28.6, 77]).addTo(this.myMap).bindPopup('Delhi').openPopup();
    L.marker([34, 77]).addTo(this.myMap).bindPopup('Leh').openPopup();


  }
  mapLoad() {
    var mapOptions = {
      zoomControl: true,
      center: [17.385044, 78.486671],
      zoom: 4,
      fadeAnimation: false,
      zoomAnimation: false
    }

    this.myMap = new L.map('newMap', mapOptions);
    const layer = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: false
    });
    this.myMap.addLayer(layer);
    // call loca api
    this.setLoad();
  }
  setLoad() {
    this.updateAction.response = [];
    this.interVal = interval(5000);
    this.subscription2 = this.interVal.subscribe(x => {
      this.loadLoc();
    })

    // this.interVal = setInterval(() => {
    //   this.loadLoc();
    // }, 5000);
  }
  ngAfterViewInit(): void {
    // init map
    this.platform.ready().then(() => {
      this.mapLoad();
    })
  }

  loadLoc() {

    this.subscription1 = this.mservice.getDetailsByLoc({ name: this.myLoc }).subscribe(response => {
      if (response) {

        let index = this.updateAction.response.findIndex((item: _device) => {
          return item.deviceId == response.deviceId;
        })
        if (index == -1) {
          this.updateAction.response.push(response)
        } else {
          // update
          this.updateAction.response[index] = response;

        }

        this.loadmap()
      }
    })
  }

  loadmap() {

    if (this.updateAction.response) {
      // console.log(this.updateAction.response.length)

      // let mIndex = 0;
      this.dataSet = this.updateAction.response.map(res => {
        return res;
      })

      this.listOverview = new findStatus(this.dataSet);
      this.display = true;


      // set marker
      let nIndex: any = 0;

      for (let a of this.dataSet) {
        // console.log(a)
        var deviceIcon = L.icon({
          iconUrl: 'assets/vts.png',
          shadowUrl: a.ignitionStatus == 'OFF' ? 'assets/ignition-off.png' : '',

          iconSize: [38, 55], // size of the icon
          shadowSize: [32, 34], // size of the shadow
          iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 107],  // the same for the shadow
          popupAnchor: [-13, -76] // point from which the popup should open relative to the iconAnchor
        });
        let marker = L.marker([a.latitude, a.longitude], { icon: deviceIcon }).bindPopup(a.deviceId).addTo(this.myMap);
        // set latest lat,lng once initialy
        // if (!this.loadOnce) {
        this.myMap.panTo(new L.LatLng(a.latitude, a.longitude));
        this.myMap.setZoom(6);

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
  initiatePolygon(a) {
    // console.log(a)
    this.imeiNum = a.deviceId;
    // console.log(this.imeiNum)
    this.display2 = false;//close list view
    this.loadmap();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Search by Location',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Chennai',
        icon: 'pin',
        data: 10,
        handler: () => {
          console.log('Share clicked');
          this.myLoc = 'chennai';
          this.setLoad();
        }
      }, {
        text: 'Mumbai',
        icon: 'pin',
        data: 'Data value',
        handler: () => {
          console.log('Play clicked');
          this.myLoc = 'mumbai';
          this.setLoad();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    // console.log('onDidDismiss resolved with role and data', role, data);
  }
  ngOnDestroy() {
    this.myMap.remove();
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
