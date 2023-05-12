import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // private token = 'BQCgLdlaF6kSfrbMp1gA2jfZo-yherQ7vckuzRh4eN6U5OH2Etc_I2Z1izyfb3LT9a2Clx0SXFxdATR5TFA6BKsZVwdYkmaQq3u8Oij-Krqp5L0Y2D4fzyZBwlykCoIZjxmV103I9E25jGJ0oGHqe6lFr2XGq0MRhRcE1NAeu_lGvnaO_wEz5wYIzA7OCku3n1iMNQUQ1iUbo2HeLnNaQ3I16u0BGsGyLHd5fxmBfsMmwH_YdPHI-OkzqpXYCIZ3xhaBCnefi3kf0Onp9NR0qNfGOw';
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}`,
  //     'Content-Type': 'application/json'
  //   })
  // };

  // public audioFiles: any[] = [];

  // constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.http.get<any>('https://api.spotify.com/v1/search?query='+this.searchText+'&offset=0&limit=20&type='+""+'&market=US')
    //   .subscribe((data: any) => {
    //     this.audioFiles = data.items;
    //     console.log(this.audioFiles);
    //   });
  }

  audiosObj=new Audio();

   audioEvents=[
   'ended',
   'error',
   'play',
   'playing',
   'pause',
   'timeupdate',
   'canplay',
   'loadedmetadata',
   'loadstart'
   ]

  audioFiles=[
    {  url:'./assets/നിലാമലരേ _ Video Song _ Diamond Necklace _ Fahadh Faasil _ Samvrutha Sunil(MP3_128K).mp3',
    name:'Nilamalare'},
     {  url:'./assets/ZERO_ Mere Naam Tu Full Song _ Shah Rukh Khan_ Anushka Sharma_ Katrina Kaif _ Ajay-Atul _T-Series(MP3_128K).mp3',
    name:'Zero'},
    {  url:'./assets/Vikramadithyan _ Dq mass intro _ Mazhavil Manorama(MP3_128K).mp3',
    name:'Vikramadithyan'},
      {  url:'./assets/Zinda Dili - Arijit Singh _ Salim Sulaiman  _ Bhoomi 2020 _ Sufiscore _ Merchant Rec_ New Song Video(MP3_128K).mp3',
    name:'Zinda Dili'},
     {  url:'./assets/Ye Jo Halka Halka Suroor Hai Song With Lyrics _ Rahat Fateh Ali Khan _ Lyrics Jukebox(MP3_128K).mp3',
    name:'halka halka'}
    
  ]

 
  CurrentTime='00:00:00';
  Duration='00:00:00';
  seek=0;
  Name='Songs'
  searchText:any=''
streamObserver(url:any,name:string){
   return new Observable(observer=>{

    this.audiosObj.src=url;
    this.audiosObj.load();
    this.Name=name
         const handler = (event:Event)=>{
      console.log(event);
      this.seek=this.audiosObj.currentTime;
    
    this.Duration=this.timeFormat(this.audiosObj.duration);
    this.CurrentTime=this.timeFormat(this.audiosObj.currentTime);
     }
     
     this.addEvent(this.audiosObj,this.audioEvents,handler)
        return()=>{
          this.audiosObj.pause();
    this.audiosObj.currentTime=0;  
    this.removeEvent(this.audiosObj,this.audioEvents,handler)

        }
   })
}


addEvent(obj:any,events:any,handler:any){
   events.forEach((event:any) => {
    obj.addEventListener(event,handler)
   });
}

removeEvent(obj:any,events:any,handler:any){
  events.forEach((event:any) => {
    obj.removeEventListener(event,handler)
   });
}

setseekTo(ev:any){
  this.audiosObj.currentTime=ev.target.value;
}
  setVolume(ev:any){
    this.audiosObj.volume=ev.target.value;

   console.log(ev.target.value);
   
  }


  openFile(url:any,name:any){
    console.log(url);
     this.streamObserver(url,name).subscribe(event=>{

     })
  }

  play(){
    this.audiosObj.play();
console.log('play');

  }

  pause(){
    this.audiosObj.pause();
    console.log('pause');

  }

  stop(){
    this.audiosObj.pause();
    this.audiosObj.currentTime=0;
    console.log('stop');

  }

  timeFormat(time:number,format='HH:mm:ss'){
    const momentTime=time*1000;
    return moment.utc(momentTime).format(format);
  }

}