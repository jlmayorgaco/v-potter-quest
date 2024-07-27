import { IStep } from "@/models/IStep.model";


export const STEPS_1: IStep[] = [
    {
        id: 2,
        name: 'STEP 3',
        enabled: false,
        text: 'Garden2',
        image: {
          //url: 'https://cdn.vectorstock.com/i/1000x1000/58/12/isometric-garden-landscape-scene-vector-26175812.webp',
          url: 'https://images.ctfassets.net/usf1vwtuqyxm/6mWwi4BAAMAWEcKCkuC2Wm/9cdcc766c7cf1d183334bb34e496dba0/Harry_Potter.png',
          caption: 'Outside Dorm Garden',
          offset: {
            x: -10,
            y: 0,
            w: 80,
            h: 80,
          }
        },
        pos: {
          x: 25,
          y: 350,
        }
      },

      {
        id: 3,
        name: 'STEP 4',
        enabled: false,
        text: 'Garden3',
        image: {
          //url: 'https://cdn.vectorstock.com/i/1000x1000/58/12/isometric-garden-landscape-scene-vector-26175812.webp',
          url: 'https://images.ctfassets.net/usf1vwtuqyxm/6mWwi4BAAMAWEcKCkuC2Wm/9cdcc766c7cf1d183334bb34e496dba0/Harry_Potter.png',
          caption: 'Outside Dorm Garden',
          offset: {
            x: -10,
            y: 0,
            w: 80,
            h: 80,
          }
        },
        pos: {
          x: 200,
          y: 650,
        }
      }
]