import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  [x: string]: any;

  constructor(
    private heroeService :HeroesService,
    private router :Router,
    private activatedRoute : ActivatedRoute) { }


   heroe!:Heroe

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) =>this.heroeService.getHeroePorId(id))
    )
    .subscribe(resp => this.heroe = resp
    )  
  }

  regresar(){
    this.router.navigate(["/heroes/listado"])
  }
}
