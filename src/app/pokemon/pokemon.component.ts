import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  Api_Url = "https://pokeapi.co/api/v2/pokemon?limit=1300";

  pokemonData : any

  PokemonName : String

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.pokemonData = {
      name : "",
      id : "",
      weight : "",
      height : "",
      base : "",
      image : "",
      type : "",
      ability : ""

    };
    this.PokemonName = "pikachu"
    this.getPokemonData(this.PokemonName);
  }


  getPokemonData(name){
    this.http.get<any>(this.Api_Url)
    .subscribe( allpokemon =>{

          allpokemon.results.forEach(pokemon => {
            if(pokemon.name == name){
              this.getPokemonDetails(pokemon.url)
            }
          }
          );

    },
      error => console.log(error)
    );

  }

  getPokemonDetails(url:any){
    this.http.get<any>(url)
    .subscribe( data =>{
      let lower = data.name.toLowerCase();
      let pokeName = data.name.charAt(0).toUpperCase() + lower.slice(1);
        this.pokemonData = {
          name : pokeName,
          id : data.id,
          weight : data.weight,
          height : data.height,
          base : data.base_experience +' hp',
          image : data.sprites['front_default'],
          type : data.types.map( (type) => type.type.name).join(', '),
          ability : data.abilities.map( (ability) => ability.ability.name).join(', ')

        };
        console.log(this.pokemonData)
    },
      error => console.log(error)
    );
  }

  onChange(value :String){
    this.getPokemonData(value);
  }


}
