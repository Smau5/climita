import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClimaProvider } from '../../providers/clima/clima'
import { Geolocation } from '@ionic-native/geolocation'
export interface IClima {
  icono: string;
  titulo: string;
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  frasesFrio : string[];
  frasesLluvia : string[];
  frasesCalor : string[];
  frasesNatural : string[];
  clima: any;
  icono: string;
  titulo: string;
  climas: { [id:string] :IClima } = {};
  frase: string;
  latitude: any;
  longitude: any;
  bgColor: string = '#252e45';
  bgUltimoColor = -1;
  ultimaFrase = -1;

  constructor(public navCtrl: NavController,
    private climaProvider: ClimaProvider,
    public geolication: Geolocation) {
      this.climas = {
        "Sunny": {icono: "fa-sun" , titulo: "Sunny"},
        "Clear": {icono: "fa-moon" , titulo: "Clear"},
        "Cloudy": {icono: "fa-cloud" , titulo: "Cloudy"},
        "Partly cloudy": {icono: "fa-cloud" , titulo: "Partly cloudy"},
        "Overcast": {icono: "fa-cloud" , titulo: "Overcast"},
        "Mist": {icono: "fa-smog" , titulo: "Mist"},
        "Patchy rain possible": {icono: "fa-cloud-showers-heavy" , titulo: "Patchy rain possible"},
        "Patchy light rain": {icono: "fa-cloud-showers-heavy" , titulo: "Patchy light rain"},
        "Moderate rain at times": {icono: "fa-cloud-showers-heavy" , titulo: "Moderate rain at times"},
        "Moderate rain": {icono: "fa-cloud-showers-heavy" , titulo: "Moderate rain"},
        "Heavy rain at times": {icono: "fa-cloud-showers-heavy" , titulo: "Heavy rain at times"},
        "Heavy rain": {icono: "fa-cloud-showers-heavy" , titulo: "Heavy rain"},
        "Moderate or heavy freezing rain": {icono: "fa-cloud-showers-heavy" , titulo: "Moderate or heavy freezing rain"},
        "Light rain shower": {icono: "fa-cloud-showers-heavy" , titulo: "Light rain shower"},
        "Light rain": {icono: "fa-cloud-showers-heavy" , titulo: "Light rain"},
        "Moderate or heavy rain shower": {icono: "fa-cloud-showers-heavy" , titulo: "Moderate or heavy rain shower"},
        "Torrential rain shower": {icono: "fa-cloud-showers-heavy" , titulo: "Torrential rain shower"},
        "Patchy light rain with thunder": {icono: "fa-poo-storm" , titulo: "Patchy light rain with thunder"},
        "Moderate or heavy rain with thunder": {icono: "fa-poo-storm" , titulo: "Moderate or heavy rain with thunder"}
      }
      this.frasesFrio = [
        "Esta haciendo frio pal carajo.",
        "Mas frio que abrazo de suegra.",
        "brrr.. carajo.",
        "Se viene el sur.",
        "Esta fresquingo."
      ];
      this.frasesLluvia = [
        "Espantaflojo nomas.",
        "Ta chilcheando.",
        "Ponete bota que se te entra la nigua."
      ];
      this.frasesCalor = [
        "Chamuscau.",
        "Calorsiño.",
        "Calorr.",
        "La calorrrr."
      ];
      this.frasesNatural = [
        "Cutuchi."
      ];

      this.changeBgColor();
  }

  ionViewWillEnter(){
/*     this.geolication.getCurrentPosition({ timeout: 30000 }).then( pos => {

    }).catch((error)=>{
      console.log(error);
    }); */
    this.latitude = "-17.7692287";
    this.longitude = "-63.172995199999995";
    this.climaProvider.getClima(this.latitude,this.longitude)
    .subscribe( clima  => {
      console.log(clima.current);
      this.clima = clima.current;
      this.cambiarFrase();

    });
  }

  public cambiarFrase(){
    if(this.clima != null){
      if(this.climas[this.clima.condition.text] == null){
        this.icono = "fa-question";
        this.titulo = "?";
      }else{
        this.icono = this.climas[this.clima.condition.text].icono;
        this.titulo = this.climas[this.clima.condition.text].titulo;
      }
      this.frase = "?";
      var temp  = Number( this.clima.temp_c)
      if(temp < 15){
        this.frase = "Esta haciendo frio pal carajo."
      }
      if(temp >= 15 && temp < 25){
        this.frase = this.frasesFrio[Math.floor(Math.random()*this.frasesFrio.length)];
      }
      if(temp >= 25 && temp < 35){
        this.frase = this.frasesCalor[Math.floor(Math.random()*this.frasesCalor.length)];
      }
      if(temp >= 35){
        this.frase = "Santa Cruz de la Sierra."
      }
      console.log(temp);
    }
  }

  public changeBgColor(){
    let listaColores = [
      '#252e45',
      '#a19e80',
      '#c86c48',
      '#869f90',
      '#971849',
      '#6dc0ec',
      '#1162bc',
      '#b271a7'
      

    ];
    var hayColor = false;
    while(!hayColor){
      var random = Math.floor(Math.random() * listaColores.length);
      if(random != this.bgUltimoColor){
        this.bgColor = listaColores[random];
        this.bgUltimoColor = random;
        hayColor = true;
      }
    }

    
  }

  public reloadPage(){
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}
