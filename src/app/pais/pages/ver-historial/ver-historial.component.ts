import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-historial',
  templateUrl: './ver-historial.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class VerHistorialComponent{

  historial: any[] = [];
  historialtemp: any[] = [];

  ngOnInit() {
    let historialpaises = JSON.parse(localStorage.getItem('historialpaises')!)
    this.historial = historialpaises;
    //console.log("historial", this.historial);
    

    this.historial.forEach(element => {
      this.historialtemp.push(element);

    }); 

    //console.log("historialtemp", this.historialtemp);
    
  }


}
