import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  getdata(){
    return this.http.get("https://01.fy25ey01.64mb.io/").pipe(map((res:any)=>{
       return res;
    }))
  }
}
