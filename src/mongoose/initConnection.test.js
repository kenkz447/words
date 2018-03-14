import { expect } from 'chai'

import * as config from '/config'
import * as initConnection from './initConnection'

describe('Mongoose connection', () => {
    it('Should have "mongoDbAddress" (mongodb database address) exported from configuration file', () => {
        expect(config).to.have.property('mongoDbAddress')
    })
    it('Should have function to connect mongodb server named "initConnection"', () => {
        expect(initConnection).to.have.property('initConnection')
    })
})