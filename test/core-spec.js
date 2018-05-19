import { List, Map } from 'immutable'
import { expect } from 'chai'

import { setEntries, next, vote } from '../src/core'

describe('application logic', () => {

  describe('setEntries', () => {
    it('adds entries to state', () => {
      const state = new Map()
      const entries = ['Trainspotting', '28 Days Later']
      const nextState = setEntries(state, entries)

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }))
    })
  })

  describe('then', () => {
    it('add next 2 entries for voting', ()=> {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      })
      const nextState = next(state)

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
      }))
    })
  })

  describe('vote', () => {
    it('creates voting result of chosen entry', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later')
      })
      const nextState = vote(state, 'Trainspotting')

      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 1
        })
      }))
    })

    it('adds result to existing entry', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 3,
          '28 Days Later': 2
        })
      })
      const nextState = vote(state, 'Trainspotting')

      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 4,
          '28 Days Later': 2
        })
      }))
    })
  })

  describe('next', () => {
    it('adds voting winner to the end of entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      })
      const nextState = next(state)

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting')
      }))
    })

    it('in case of draw adds both entries to the end of the list', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 3
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      })
      const nextState = next(state)

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
      }))
    })

    it('when only one entry remains, marks it as winner', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List.of()
      })
      const nextState = next(state)

      expect(nextState).to.equal(Map({
        winner: 'Trainspotting'
      }))
    })
  })
})
