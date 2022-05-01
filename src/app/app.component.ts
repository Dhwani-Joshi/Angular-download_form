import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public date = new Date();
  bsValue = new Date();
  bsRangeValue: Date[] | undefined;
  maxDate = new Date();
  minDate = new Date();
  enabledDates: any;
  disabledDates: any;
  websiteList: any = ['Bangalore', 'Chennai', 'Hyderabad', 'Mumbai', 'New Delhi']
  form = new FormGroup({
    website: new FormControl('', Validators.required)
  });
  firstName!: any;
  lastName!: any  ;
  dob!: any  ;
  city!: any  ;
  humidity: any;
  temp: any;
  lat:any;
  long:any;
  constructor(private http: HttpClient) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  get f() {
    return this.form.controls;
  }
  title = 'upwork-form';

  getLatLOng() {
    this.city = document.getElementById('selCity');
    if (this.city.value == 'Chennai'){
      this.lat = 36;
      this.long = 139;
    } else if (this.city.value == 'Bangalore'){
      this.lat = 46;
      this.long = 140;
    } else if (this.city.value == 'Mumbai'){
      this.lat = 38;
      this.long = 143;
    } else if (this.city.value == 'Hyderabad'){
      this.lat = 48;
      this.long = 153;
    } else if (this.city.value == 'New Delhi'){
      this.lat = 58;
      this.long = 160;
    }
    this.getWeatherApi();
  }

  getWeatherApi(){
    fetch
    ('https://api.openweathermap.org/data/2.5/weather?lat='+this.lat+'&lon='+this.long+'&appid=4b1462012a44e3b70955c27a5f814cd8')
    .then(response => response.json())
    .then(data=>{this.humidity = data.main.humidity;
    this.temp = data.main.temp;
  this.downloadItems(); })
  }

   downloadItems() {
     this.firstName = document.getElementById('txtFName');
     this.lastName = document.getElementById('txtLName');
     this.dob = document.getElementById('txtDate');
     this.city = document.getElementById('selCity');
   // This variable stores all the data.
    let data =
    '\r First Name: ' + this.firstName.value + ' \r\n ' + 
    '\r Last Name: ' + this.lastName.value + ' \r\n ' + 
    '\r DOB: ' + this.dob.value + ' \r\n ' + 
    '\r City: ' + this.city.value + ' \r\n ' +
    '\r humidity: ' + this.humidity + '\r\n' +
    '\r temp: ' + this.temp + '\r\n' 



    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: 'text/plain' });
    const sFileName = 'formData.txt';	   // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
      newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
      newLink.href = window.URL.createObjectURL(textToBLOB);
      newLink.style.display = "none";
      document.body.appendChild(newLink);
    }

    newLink.click();
   

  }
}
