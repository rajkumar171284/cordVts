import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare var google;

const header3 = new HttpHeaders();
// header3.append('Content-Type', 'multipart/form-data');
// header3.append('Accept', 'image/jpeg');
// header3.append("Access-Control-Allow-Headers", "Content-Type");
header3.append('Access-Control-Allow-Origin', 'http://localhost:8100');
header3.append('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS');

const options3 = {
  headers: header3
}

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  sendMsg:any=[]
  headers;
  options2;
  options3;
  constructor(private http: HttpClient) {
    const header2 = new HttpHeaders();
    this.options2 = {
      headers: header2
    }
  }

  getDetailsByLoc(params): Observable<any> {
    return this.http.post(environment.urllive + '/' + params.name + '/loc', params, options3).pipe(map(response => {
      return response;
    }));
  }

  getDeviceMgtSys(params): Observable<any> {
    return this.http.post(environment.url + "/history?key=&value=", params, options3).pipe(map(response => {
      return response;
    }));
  }
  getLatLngAddr(params): Observable<any> {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + params.latitude + "," + params.longitude + "&key=" + environment.api_key, options3).pipe(map(response => {
      return response;
    }));
  }




  public ignitionStatus(item) {
    if (item.ignitionStatus == 'ON')
      return 'success';
    else
      return 'danger';
  }
  public geocodeLatLng(map, latitude, longitude) {
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();
    const latlng = {
      lat: latitude,
      lng: longitude,
    };
    geocoder.geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          console.log(response.results[0])

          console.log(response.results[0].formatted_address)
          map.setZoom(11);
          const marker = new google.maps.Marker({
            position: latlng,
            map: map,
          });
          infowindow.setContent(response.results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }

}
