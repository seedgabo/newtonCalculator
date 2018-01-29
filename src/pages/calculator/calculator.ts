import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import * as moment from 'moment'
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Api } from '../../providers/Api';
@IonicPage()
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {
  @ViewChild(Slides) slides: Slides;
  event: any = {
    name: "Nuevo Evento",
    start: (new Date()).toISOString(),
    end: "",
    zone: 'costa',
    products: [
      {
        name: 'Core',
        image: 'https://fotosllano.s3.amazonaws.com/photos/25936/large/bavaria-aguila-baja-precio-mil-500-mundial-rusia-informando-villavicecencio.jpg?1510338951',
        quantity: 0,
        ventAnt: 0,
        maco: 192.483,
        conversion: 0.08520
      },
      {
        name: 'Premium',
        image: 'http://revistadiners.com.co/wp-content/uploads/2014/04/clubcolombia_800x669.jpg',
        quantity: 0,
        ventAnt: 0,
        maco: 224.685,
        conversion: 0.08520
      },
      {
        name: 'SuperPremium',
        image: 'http://pixel.nymag.com/imgs/daily/grub/2015/06/16/16-corona-beer.w710.h473.2x.jpg',
        quantity: 0,
        ventAnt: 0,
        maco: 241.402,
        conversion: 0.08520
      },
      {
        name: 'NAB',
        image: 'https://admin.kienyke.com/wp-content/uploads/2015/09/Pony-malta-P-662x345.jpg',
        quantity: 0,
        ventAnt: 0,
        maco: 115.311,
        conversion: 0.08520
      },
    ],
    kits: [
      {
        name: 'Carpa',
        quantity: 0,
        image: 'https://www.carpasarlia.com/wp-content/uploads/2016/09/carpa-2x2-blanca.jpg',
        price: 10000
      },
      {
        name: 'Valla',
        quantity: 0,
        image: 'http://www.mallasgalbis.es/data/foto/img_gran_VALLA-MOVIL-Y-PEATONAL_1880.jpg',
        price: 6000
      },
      {
        name: 'Tarima A',
        quantity: 0,
        image: 'https://alquilerdecarpasencali.files.wordpress.com/2012/03/carpatarima-sonido-linea-ray-mediano2.jpg',
        price: 2500000
      },
      {
        name: 'Tarima B',
        quantity: 0,
        image: 'https://andamiosandino.com/wp-content/uploads/2014/07/tarimas.jpg',
        price: 528000
      },
      {
        name: 'Equipo de Frio',
        quantity: 0,
        image: 'https://www.paladareventos.com/imagenesdb/nevera-vitrina-vertical-puertas-cristal-web.jpeg',
        price: 20000
      },
      {
        name: 'Hielo',
        quantity: 0,
        image: 'https://super.walmart.com.mx/images/product-images/img_large/00079912400006L.jpg',
        price: 8000
      },
      {
        name: 'Bandeja y Plastilona',
        quantity: 0,
        image: 'http://toccmarket.com/image/cache/catalog/A%20SUPER%20COMBOS/Canasta%20Poker%20+%20Obsequio%20Canasta%20de%209%20Puestos-1000x798.jpg',
        price: 200000
      },
      {
        name: 'Kit Manero',
        quantity: 0,
        price: 14000
      },
      {
        name: 'Nevera IcoPor',
        quantity: 0,
        image: 'https://www.mundicopor.com/wp-content/uploads/2017/04/620.jpg',
        price: 40000
      },
      {
        name: 'Baños',
        quantity: 0,
        image: 'https://images.locanto.cl/1142488500/Banos-de-Lujo-para-eventos-Karawan_3.jpg',
        price: 130000
      },
    ],
    inversion: 0,
    profit: 0,
  }
  index = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public api: Api) {
    if (navParams.get('event')) {
      this.event = navParams.get('event')
    }
  }

  ionViewDidLoad() {
    this.api.storage.get('event').then((ev: any) => {
      if (ev) {
        this.event = ev;
      }
    })
  }

  changeEnd() {
    this.event.end = moment(this.event.start).add('1', 'day').toISOString();
  }


  next() {
    this.index = this.slides.getActiveIndex() + 1
    this.slides.slideNext()
  }

  previous() {
    this.index = this.slides.getActiveIndex() - 1
    this.slides.slidePrev()
  }

  incremental() {
    var total = 0
    this.event.products.forEach((p) => {
      total += (parseInt(p.quantity) - parseInt(p.ventAnt)) * p.conversion
    });
    return total
  }

  inversion() {
    var total = 0
    this.event.kits.forEach((p) => {
      total += p.quantity * p.price
    });
    return total;
  }

  roi() {
    var inversion = this.inversion()
    if (inversion == 0) {
      return "";
    }
    return ((this.incremental() * 193.470) - inversion) / inversion
  }

  save() {
    this.api.storage.set('event', this.event);
    this.alert.create({
      title: "Guardado Correctamente",
      buttons: ["OK"]
    }).present()
  }

}
