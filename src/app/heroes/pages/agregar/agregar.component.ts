import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
     private router : Router,
     private snackBar: MatSnackBar) { }

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
      .subscribe( resp => this.mostrarSnackBar('Se ha Actualizado el Heroe! 😁')
      )
    }else{
      //crea un heroe
      this.HeroesService.agregarHeroe(this.heroe).subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])
        this.mostrarSnackBar('se ha creado el heroe')
        this.router.navigate(['/heroes/listado'])
      })
    }

  }
  
  borrarHeroe(){
    this.HeroesService.borrarHeroe(this.heroe.id!)
    .subscribe( resp => this.router.navigate(["/heroes"]))
  }
  
  mostrarSnackBar(mensaje: string): void{
    this.snackBar.open(mensaje, 'Cerrar',{
      duration: 2000
    })
  }
}
