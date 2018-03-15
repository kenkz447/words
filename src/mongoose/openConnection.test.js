import { expect } from 'chai'

import * as config from '/config'
import * as openConnection from './openConnection'

describe('Mongoose connection', () => {
    it('Should have "mongoDbAddress" (mongodb database address) exported from configuration file', () => {
        expect(config).to.have.property('mongoDbAddress')
    })
    it('Should have function to connect mongodb server named "openConnection"', () => {
        expect(openConnection).to.have.property('openConnection')
    })
})