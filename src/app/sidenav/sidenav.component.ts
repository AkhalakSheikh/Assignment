import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MainComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
   schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SidenavComponent implements OnInit{
 flag = false;

 constructor(){

 }

 ngOnInit(){
  
 }

 openCloseNav() {
  this.flag = !this.flag;

  const sidenav = document.getElementById("sidenav");
  const mainContent = document.querySelector('.main') as HTMLElement; // Type assertion

  if(this.flag){
      sidenav!.style.width = "13%";
      mainContent.style.marginLeft = "12%";
  }else{
      sidenav!.style.width = "60px";
      mainContent.style.marginLeft = "60px";
  }
}


}
