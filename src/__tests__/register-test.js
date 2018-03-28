import resolve from 'did-resolver'
import register from '../register'

describe('ethResolver', () => {
  register()
  describe('resolve', () => {
    describe('valid DID docs', () => {
      const address = '0xf3beac30c498d9e26865f34fcaa57dbb935b0d74'
      const did = `did:eth:${address}`
      const didDoc = {
        '@context': 'https://w3id.org/did/v1',
        id: did,
        publicKey: [{
          id: `${did}#keys-1`,
          type: 'Secp256k1VerificationKey2018',
          owner: did,
          ethereumAddress: address
        }],
        authentication: [{
          type: 'Secp256k1SignatureAuthentication2018',
          publicKey: `${did}#keys-1`
        }]
      }

      it('resolves document', async () => {
        expect(resolve(did)).resolves.toEqual(didDoc)
      })
    })

    describe('error handling', () => {
      it('rejects promise', async () => {
        expect(resolve('did:eth:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).rejects.toEqual(new Error('Not a valid eth DID: did:eth:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX'))
      })
    })
  })
})
