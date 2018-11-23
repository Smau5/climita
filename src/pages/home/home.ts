import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClimaProvider } from '../../providers/clima/clima'

export interface IClima {
  icono: string;
  titulo: string;
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  
  clima: any;
  icono: string;
  titulo: string;
  climas: { [id:string] :IClima } = {};
  frase: string;
  constructor(public navCtrl: NavController,
    private climaProvider: ClimaProvider) {
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
        "Moderate or heavy rain shower": {icono: "fa-cloud-showers-heavy" , titulo: "Moderate or heavy rain shower"},
        "Torrential rain shower": {icono: "fa-cloud-showers-heavy" , titulo: "Torrential rain shower"},
        "Patchy light rain with thunder": {icono: "fa-poo-storm" , titulo: "Patchy light rain with thunder"},
        "Moderate or heavy rain with thunder": {icono: "fa-poo-storm" , titulo: "Moderate or heavy rain with thunder"}
      }
  }

  ionViewWillEnter(){
    this.climaProvider.getClima()
    .subscribe( clima  => {
      console.log(clima.current);
      this.clima = clima.current;
    
      if(this.climas[clima.current.condition.text] == null){
        this.icono = "fa-question";
        this.titulo = "?";
      }else{
        this.icono = this.climas[clima.current.condition.text].icono;
        this.titulo = this.climas[clima.current.condition.text].titulo;
      }
      this.frase = "?";
      var temp  = Number( this.clima.temp_c)
      if(temp < 15){
        this.frase = "Esta haciendo frio pal carajo."
      }
      if(temp >= 15 && temp < 25){
        this.frase = "Bien fresquito el clima."
      }
      if(temp >= 25 && temp < 35){
        this.frase = "Calorsiño."
      }
      if(temp >= 35){
        this.frase = "Santa Cruz de la Sierra."
      }
      console.log(temp);
    });
  }

  public reloadPage(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}
