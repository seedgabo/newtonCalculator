import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import * as moment from 'moment'
@IonicPage()
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {
  @ViewChild(Slides) slides: Slides;
  event:any = {
    name: "Nuevo Evento",
    start: (new Date()).toISOString(),
    end: "",
    products: [],
    inversion: 0,
    profit: 0,
  }
  index = 0;
  products = [{ name: 'Test', quantity: 0, description: ""}]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(navParams.get('event')){
      this.event = navParams.get('event')
    }
  }

  ionViewDidLoad() {
  }

  changeEnd(){
      this.event.end = moment(this.event.start).add('1','day').toISOString();
  }


  next(){
    this.index = this.slides.getActiveIndex() + 1
    this.slides.slideNext()
  }

  previous(){
    this.index = this.slides.getActiveIndex()  - 1
    this.slides.slidePrev()
  }

}
