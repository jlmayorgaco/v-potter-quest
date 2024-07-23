import { defineStore } from 'pinia'
const cssThemeClasses  = {
    'gryffindor': 'theme__gryffindor',
    'slytherin': 'theme__slytherin',
    'hufflepuff': 'theme__hufflepuff',
    'ravenclaw': 'theme__ravenclaw',
}
const defaultHouse = localStorage.getItem('pq.house') || 'gryffindor';
const defaultSplash = !localStorage.getItem('pq.splash');

export const useThemeStore = defineStore('theme', {

  state: () => {
    return { 
        house: defaultHouse,
        splash: defaultSplash
    }
  },

  getters: {
    theme__class: (state) => cssThemeClasses[state.house as keyof typeof cssThemeClasses ],
  },

  actions: {
    setHouse(house: string) {
      this.house = house;
      localStorage.setItem('pq.house', house);
    },
    setSplash(state: boolean) {
      this.splash = state;
      localStorage.setItem('pq.splash', "true")
    },
  },
})