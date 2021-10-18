import { Component} from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { PaisInputComponent } from '../../components/pais-input/pais-input.component';
import { Country } from '../../interfaces/pais.interface';



@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {


  termino : string = '';
  hayError: boolean = false;
  paises  : Country[] = [];
  historialpaises: any[] = [] ;
  
  paisesSugeridos   : Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService ) { }

  ngOnInit() {

    let itemlocalstorage =  JSON.parse(localStorage.getItem('historialpaises')!) 
    if(itemlocalstorage){
      this.historialpaises = itemlocalstorage;
    }
  }
  
  buscar( termino: string ) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino  = termino;

    this.paisService.buscarPais( termino )
      .subscribe( (paises) => {

        this.historialpaises.push({
          name: paises[0].name,
          alpha2Code: paises[0].alpha2Code,
          capital:  paises[0].capital,
          flag:  paises[0].flag,
          population: paises[0].population,
          horabusqueda: new Date()         

        })
        this.paises = paises;
        localStorage.setItem('historialpaises', JSON.stringify(this.historialpaises) );
        
      }, (err) => {
        this.hayError = true;
        this.paises   = [];
      });

  }

  sugerencias( termino: string ) {
    //console.log("sugerencias");
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    
    this.paisService.buscarPais( termino )
      .subscribe( 
        paises => this.paisesSugeridos = paises.splice(0,5),
        (err) => this.paisesSugeridos = []
      );

  }

  buscarSugerido( termino: string ) {
    this.buscar( termino );
    console.log("buscarsugerido");
    
  }


}
