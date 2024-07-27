import { IQuest } from '@/models/IQuest.model'
import { IStep } from '@/models/IStep.model'

export const STEP_TUTORIAL_INTRO: IStep = {
  id: 0,
  name: 'Step Dorms',
  enabled: true,
  text: 'Dorms',
  image: {
    //url: 'https://i.pinimg.com/1200x/4a/08/c7/4a08c74d720e1cb68a755dbd024aef82.jpg',
    url: 'https://images.ctfassets.net/usf1vwtuqyxm/6mWwi4BAAMAWEcKCkuC2Wm/9cdcc766c7cf1d183334bb34e496dba0/Harry_Potter.png',
    caption: 'Isometric Purple Dorm',
    offset: {
      x: -10,
      y: 0,
      w: 80,
      h: 80
    }
  },
  pos: {
    x: 0,
    y: 0
  }
}

export const STEP_TUTORIAL_QUESTS: IStep = {
  id: 1,
  name: 'Step Outside Dorms',
  enabled: false,
  text: 'Garden',
  image: {
    //url: 'https://cdn.vectorstock.com/i/1000x1000/58/12/isometric-garden-landscape-scene-vector-26175812.webp',
    url: 'https://images.ctfassets.net/usf1vwtuqyxm/6mWwi4BAAMAWEcKCkuC2Wm/9cdcc766c7cf1d183334bb34e496dba0/Harry_Potter.png',
    caption: 'Outside Dorm Garden',
    offset: {
      x: -10,
      y: 0,
      w: 80,
      h: 80
    }
  },
  pos: {
    x: 150,
    y: 200
  }
}

export const STEPS_TUTORIALS: IStep[] = [STEP_TUTORIAL_INTRO, STEP_TUTORIAL_QUESTS]
