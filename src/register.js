import { registerMethod } from 'did-resolver'

export function wrapDidDocument (did, address) {
  return {
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
}

function register () {
  function resolve (did, parsed) {
    return new Promise((resolve, reject) => {
      if (!parsed.id.match(/^0x[0-9a-fA-F]{40}$/)) reject(new Error(`Not a valid eth DID: ${did}`))
      resolve(wrapDidDocument(did, parsed.id))
    })
  }

  registerMethod('eth', resolve)
}

module.exports = register
