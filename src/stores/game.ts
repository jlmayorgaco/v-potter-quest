import { GAME } from '@/config/GAME';
import { defineStore } from 'pinia'

const defaultCurrentStep = localStorage.getItem('pq.game.current.step') || 0;
const defaultGame = JSON.parse(localStorage.getItem('pq.game.current.game') || 'null') || GAME;

export const useGameStore = defineStore('game', {

  state: () => {
    return { 
        now: defaultCurrentStep,
        game: defaultGame
    }
  },

  getters: {
    getNow: (state) => state.now,
    //quests: (state) => state.quests,
  },

  actions: {
    goToStep(stepNumber: number) {
      this.now = stepNumber;
      this.game.steps[stepNumber].enabled = true;
      localStorage.setItem('pq.game.current.step', String(this.now));
      localStorage.setItem('pq.game.current.game', String(JSON.stringify(this.game)));
    },
    next() {
      this.now = Math.max(0, Number(this.now) + 1);
      this.game.steps[Math.max(0,this.now - 1)].enabled = true;
      localStorage.setItem('pq.game.current.step', String(this.now) );
      localStorage.setItem('pq.game.current.game', String(JSON.stringify(this.game)));
    },
    prev() {
        this.now = Math.max(0, Number(this.now) - 1);
        this.game.steps[Math.max(0, this.now + 1)].enabled = true;
        localStorage.setItem('pq.game.current.step', String(this.now));
        localStorage.setItem('pq.game.current.game', String(JSON.stringify(this.game)));
    },
  },
})