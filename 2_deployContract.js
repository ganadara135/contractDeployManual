const Web3 = require('web3')
const rpcURL = 'https://ropsten.infura.io/v3/f2d6082eec7d47fd9843b71b0651e47d' // Your RCkP URL goes here' // Your RCP URL goes here
const web3 = new Web3(rpcURL)
const fs = require('fs');
const solc = require('solc');
const Tx = require('ethereumjs-tx')
const addressMy = '0x83438A43F40b7f442a55a4C63EC20549ba4AD6ae' // Your account address goes here
let private_key = "1db0908c2331e0502b529163e1f2fa21aec4fd8d109dba7d800adc6ec0375a40"

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
console.log("output : ", output)
var abi = output.contracts[CONTRACT_FILE]['Coursetro'].abi

var bytecode = output.contracts[CONTRACT_FILE]['Coursetro'].evm.bytecode.object
var myContract = new web3.eth.Contract(abi);
var myContractTX = myContract.deploy({data: bytecode, arguments: []});
//web3.eth.estimateGas(myContractTX).then(console.log);


web3.eth.getTransactionCount(addressMy, "pending").then((totalCount) => {
     // Get contract data
    const contractData =   '0x' + bytecode;

    // Construct the raw transaction 
     let rawTx = {
         nonce : web3.utils.toHex(totalCount),
         gasPrice : web3.utils.toHex(300000000),
         gasLimit : web3.utils.toHex(2100000),
         from : addressMy,
         data: contractData
         //value : 1*10**17
     };
 
     // Sign and serialize the transaction
    const tx = new Tx(rawTx);
    tx.sign(new Buffer(private_key, 'hex'));
    const serializedTx = tx.serialize();

    let sts = '0x' + serializedTx.toString('hex')
    // Send the transaction
    web3.eth.sendSignedTransaction(sts, (err, hash) => {
        if (err) { console.log(err); return; }

        // Log the tx, you can explore status manually with eth.getTransaction()
        console.log('contract creation tx: ' + hash);

        // Wait for the transaction to be mined
    // waitForTransactionReceipt(hash);
    });
 
 }).catch(error => { throw error})

