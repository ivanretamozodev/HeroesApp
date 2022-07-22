import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {  id: "DC Comics",
    desc: "DC - Comics"},
    {
      id: "Marvel Comics",
      desc: "Marvel - Comics"
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor(private HeroesService : HeroesService,
     private activatedRoute : ActivatedRoute,
     private router : Router) { }

  ngOnInit(): void {
    if( !this.router.url.includes('editar') ) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.HeroesService.getHeroePorId( id ) )
      )
      .subscribe( heroe => this.heroe = heroe );

  }

  guardar(){
    if (this.heroe.superhero.trim().length === 0) {
      return
    }

    if (this.heroe.id) {
      //actualiza el heroe
      this.HeroesService.actualizarHeroe(this.heroe)
      .subscribe( resp => console.log(resp)
      )
    }else{
      //crea un heroe
      this.HeroesService.agregarHeroe(this.heroe).subscribe(heroe => 
        this.router.navigate(['/heroes/editar', heroe.id]) )
    }

  }
  
  

}
