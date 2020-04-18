import { Pipe, PipeTransform } from '@angular/core';
import {IEvent} from '../model/event';

@Pipe({
  name: 'events'
})
export class EventsPipe implements PipeTransform {

  transform(events:IEvent[], searchTerm:string): IEvent[] {
    if(!events || !searchTerm){
      return events;
    }

    return events.filter(event=>event.eventName.toLowerCase().indexOf(searchTerm.toLowerCase())!== -1 ||event.eventState.toLowerCase().indexOf(searchTerm.toLowerCase())!== -1 || event.eventCountry.toLowerCase().indexOf(searchTerm.toLowerCase())!== -1)
  }

}
