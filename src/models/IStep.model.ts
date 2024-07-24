import { IQuest } from './IQuest.model';
export interface IStep {
  id: number,
  name: string,
  enabled: boolean,
  text: string,
  quest?: IQuest,
  image: {
    url: string;
    caption: string;
    offset:{
        x: number; //px
        y: number; //px
        h: number; //%
        w: number; //%
    }
  },
  pos: {
    x: number
    y: number
  }
}
