import { IStep } from '@/models/IStep.model'
import { STEPS_TUTORIALS } from './s0_tutorials.steps'
import { STEPS_1 } from './s1_.steps'

export const STEPS = [
    ...STEPS_TUTORIALS,
    ...STEPS_1,
]

export const GAME = {
  name: '',
  version: '',
  updated_at: '',

  steps: STEPS.map((step, index) => ({...step, id: index}))
}
