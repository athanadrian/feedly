import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable()
export class LocaleProvider {

  constructor() {
  }

  ago(time){
    let differnce=moment(time).diff(moment());
    return moment.duration(differnce).humanize();
  }

}
