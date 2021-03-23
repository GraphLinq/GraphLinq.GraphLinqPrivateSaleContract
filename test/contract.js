const artifacts = require('../build/contracts/GraphLinqPrivateSale.json')
const contract = require('truffle-contract')

const GraphLinqPrivateSale = contract(artifacts);
GraphLinqPrivateSale.setProvider(web3.currentProvider);

const getDecimalsAmount = (amount) => {
    return amount * (10 ** 18).toFixed()
}

const participatePresale = (contract, amount, acc) => {
    return new Promise(async (cb) => {
        try {
            let txHash = await web3.eth.sendTransaction({from: acc, to: contract.address, value: web3.utils.toWei(amount, 'ether'), gasLimit: 31000, gasPrice: 30000000000 });
            console.log(txHash)
            
            cb(txHash)
        } catch(e) { console.error(e) }
    })
}

const withdraw = (contract, acc) => {
    return new Promise(async (cb) => {
        try {
            const res = await contract.withdraw({from: acc})
            console.log(res)
            cb()
        } catch(e) { console.error(e) }
    })
}

const amountInvestedAddr = (contract, acc) => {
    return new Promise(async (cb) => {
        try {
            const res = await contract.getAddressInvestment(acc, {from: acc})
            console.log(res.toString() / 10 ** 18)
            cb()
        } catch(e) { console.error(e) }
    })
}

const claimGlq = (contract, acc) => {
    return new Promise(async (cb) => {
        try {
            const res = await contract.claimGlq({from: acc})
            console.log(res)
            cb()
        } catch(e) { console.error(e) }
    })
}

const setClaim = (contract, state, acc) => {
    return new Promise(async (cb) => {
        try {
            const res = await contract.setClaim(true, {from: acc})
            console.log(res)
            cb()
        } catch(e) { console.error(e) }
    })
}

module.exports = async (callback) => {
    let accounts = await web3.eth.getAccounts()
    web3.eth.defaultAccount = accounts[0]
    const deployedContract = await GraphLinqPrivateSale.deployed()
    await setClaim(deployedContract, true, accounts[0])
    //await amountInvestedAddr(deployedContract, accounts[0])
    //await claimGlq(deployedContract, accounts[0])

    //await participatePresale(deployedContract, "1", accounts[0])
    //await withdraw(deployedContract, accounts[0])

    callback();
}