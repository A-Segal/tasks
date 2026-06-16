
// import { CommonModule } from '@angular/common';
// import { Component, inject } from '@angular/core';
// import { ihomedata } from '../Model/ihomeData';
// import { Title } from '@angular/platform-browser';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-home',
//   imports: [CommonModule],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.scss'
// })
// export class HomeComponent {
//   router = inject(Router); 
//     hd:ihomedata={
//         name:"שמי איידי סגל",
//         phon:"",
//         text:"",
//         img:"/assets/images/aidymail.jpg"
              

//      }

     
  




//  click(){
//  this.hd.name="אני מתכנתת הייטק"

//  }
//  click2(){
//   this.hd.phon="🔹🔹0556734525🔹🔹"
//  }
//  click3(){
//    this.hd.text =" SQL     React      angualar    Html     js     Node-js    c++   Java יש לי ידע נרחב "
  
//  }
//  click4(){
//   this.hd.name="שמי איידי סגל"
  
//   this.hd.text=""
  
//   this.hd.phon=""
//  }
//  gotoTasks(){
//   this.router.navigate(['/login'], { queryParams: { returnUrl: '/main/tasks' } });
//     }
// }


import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ihomedata } from '../Model/ihomeData';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private router = inject(Router);

  hd: ihomedata = {
    name: " Aidy Segal",
    phon: "",
    text: "",
    img: "/assets/images/aidymail.jpg"
  };

  private readonly originalHd = { ...this.hd };
  email = 'AS@GMAIL.COM';
  setName() {
    this.hd.name = "fualstack developer  ";
    this.hd.text = "";
    this.hd.phon = "";
  }

  showPhone() {
    this.hd.phon = "🔹🔹0556734525🔹🔹";
    this.hd.text = "";
  }

  showSkills() {
    this.hd.text = "SQL, React, Angular, HTML, JS, Node.js, C++, Java – יש לי ידע נרחב";
    this.hd.phon = "";
  }

  resetInfo() {
    this.hd = { ...this.originalHd };
  }

  gotoTasks() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: '/main/tasks' } });
  }
}
