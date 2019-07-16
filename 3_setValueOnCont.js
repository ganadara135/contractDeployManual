const Web3 = require('web3')
const rpcURL = 'https://ropsten.infura.io/v3/f2d6082eec7d47fd9843b71b0651e47d' // Your RCkP URL goes here' // Your RCP URL goes here
const web3 = new Web3(rpcURL)
const fs = require('fs');
const solc = require('solc');
const Tx = require('ethereumjs-tx')
const addressMy = '0x83438A43F40b7f442a55a4C63EC20549ba4AD6ae' // Your account address goes here
let private_key = "1db0908c2331e0502b529163e1f2fa21aec4fd8d109dba7d800adc6ec0375a40"

// Read the deployed contract - get the addresss from Etherscan
const contractAddress = '0x40Bc7ee742Fe1F255048D086393d7B2218639a80'


// Compile the source code
var CONTRACT_FILE = 'Coursetro.sol'
var content =fs.readFileSync(CONTRACT_FILE).toString()
var inputFormat = {
  language: 'Solidity',
  sources: {
    'Coursetro.sol' : {
      content: content
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}



var compiled = solc.compile(JSON.stringify(inputFormat))
var output = JSON.parse(compiled)

var abi = output.contracts[CONTRACT_FILE]['Coursetro'].abi
//console.log("abi : ", abi)
//var bytecode = output.contracts[CONTRACT_FILE]['Coursetro'].evm.bytecode.object
var myContract = new web3.eth.Contract(abi, addressMy);


// Transfer some tokens
web3.eth.getTransactionCount(addressMy, (err, txCount) => {

    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      to: contractAddress,
      data: myContract.methods.setInstructor("KCOD135", 135).encodeABI()
    }
  
    const tx = new Tx(txObject)
    tx.sign(new Buffer(private_key, 'hex'));
  
    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')
  
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        if (err) { console.log(err); return; }
      console.log('txHash:', txHash)
      // Use this txHash to find the contract on Etherscan!
    })
})



// Check Token balance for account2
myContract.methods.getInstructor().call((err, result) => {
console.log({ err, result })
})
