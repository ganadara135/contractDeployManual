const Ethereumjs  = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const rpcURL = 'https://ropsten.infura.io/v3/f2d6082eec7d47fd9843b71b0651e47d' // Your RCkP URL goes here
const web3 = new Web3(rpcURL)
console.log("1111")

const address = '0x83438A43F40b7f442a55a4C63EC20549ba4AD6ae' // Your account address goes here
let returnValue = web3.eth.getBalance(address, (err, wei) => { balance = web3.utils.fromWei(wei, 'ether')
console.log("myBlance : ", balance )
})

console.log(" returnValue : ", returnValue)


////////////222222222222222222222222

let password = 'test'
let keystore = web3.eth.accounts.create().encrypt(password)
let private = web3.eth.accounts.decrypt(keystore, password)

//console.log(keystore)
//console.log(private)


let blockinfoFunc =  async function() {
    let reValue = null;
    try{
        reValue =  await web3.eth.getBlock(0);
        //console.log("reValue : ", reValue)
    }catch(err){
        console.log(err)
    }    
    
    return reValue;
};
//console.log("blockinfoFunc : ", blockinfoFunc())

//web3.eth.getBlockNumber().then(console.log()).then(dd).then(ds)

// 페이지 201
// npm install ethereumjs-tx  --save

let addressMy = "0x83438A43F40b7f442a55a4C63EC20549ba4AD6ae"
let private_key = "1db0908c2331e0502b529163e1f2fa21aec4fd8d109dba7d800adc6ec0375a40"
let toAddress = "0x9a87d53b56509CB6A22F5d42d397c659F0aCF336"

web3.eth.getTransactionCount(addressMy, "pending").then((totalCount) => {
   // console.log("totalCount : ", totalCount)
    //return totalCount;

    let rawTx = {
        nonce : web3.utils.toHex(totalCount),
        gasPrice : web3.utils.toHex(21*10**9),
        gasLimit : web3.utils.toHex(21000),
        from : addressMy,
        to : toAddress,
        value : 1*10**17
    };

    let tx = Ethereumjs(rawTx)
    //let pk = new Ethereumjs.Buffer(private_key, 'hex')
    tx.sign(Buffer.from(private_key, 'hex'))



    let serializedTx = tx.serialize();
    let sts = '0x' + serializedTx.toString('hex')
    web3.eth.sendSignedTransaction(sts, (err, txHash) => {
        //console.log('txHash : ', txHash)

        web3.eth.getTransaction(txHash).then((callbackValue) => {
            //console.log("callbackValue : ", callbackValue)
        })
    })

  //  console.log("txInfo : ", txInfo)

}).catch(error => { throw error})





let ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fName",
				"type": "string"
			},
			{
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setInstructor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getInstructor",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "age",
				"type": "uint256"
			}
		],
		"name": "Instructor",
		"type": "event"
	}
]

// 컨트랙트 배포
const Coursetro = web3.eth.Contract(ABI,'0x5e50f8c3f1037ade40ee18adf2a5603c31f2577b')

Coursetro.methods.getInstructor().call().then(result => console.log(" call check: ", result))
//console.log(Coursetro);

let bytedata = Coursetro.methods.setInstructor("KCOD88", 100).encodeABI()
console.log("bytedata: ", bytedata)

//var Courses = Coursetro.at('0x5e50f8c3f1037ade40ee18adf2a5603c31f2577b');



