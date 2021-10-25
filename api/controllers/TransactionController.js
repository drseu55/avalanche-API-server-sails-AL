/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dotenv = require('dotenv');

dotenv.config();
 
const cChainMethods = require('../services/c-chain');
const xChainMethods = require('../services/x-chain');
const pChainMethods = require('../services/p-chain');
 
const X_CHAIN = 'X';
const P_CHAIN = 'P';
const C_CHAIN = '0x';

module.exports = {
    getTransactionByHash: async function (req, res) {
        let xChainTransaction;
        let cChainTransaction;
        let pChainTransaction;
    
        xChainTransaction = await xChainMethods.getTransactionByIdFromXChain(req.params.hash);
        cChainTransaction = await cChainMethods.getTransactionByHashFromCChain(req.params.hash);
        pChainTransaction = await pChainMethods.getTransactionByIdFromPChain(req.params.hash);
    
        if (xChainTransaction == 1 && cChainTransaction[0] == 1 && pChainTransaction == 1) {
            res.send(JSON.parse('{"result":"connection refused to avalanche client or api call rejected"}'));
        } else if (xChainTransaction != 1) {
            res.send(xChainTransaction);
        } else if (cChainTransaction[0] != 1) {
            res.send(cChainTransaction[1]);
        } else if (pChainTransaction != 1) {
            res.send(pChainTransaction);
        }
    
    },
    getXTransactionsAfterNthFromAddress: async function (req, res) {
        let xChainTransactions;
        let pChainTransactions;
        let cChainTransactions;
    
        if ((req.params.address).charAt(0) == X_CHAIN) {
            xChainTransactions = await xChainMethods.getXTransactionsAfterNthFromAddressFromXChain(req.params.address, req.params.n, req.params.x);
    
            if (xChainTransactions[0] == 1) {
                res.send(xChainTransactions[1]);
            } else {
                res.send(xChainTransactions[1]);
            }
        } else if ((req.params.address).charAt(0) == P_CHAIN) {
            pChainTransactions = await pChainMethods.getXTransactionsAfterNthFromAddressFromPChain(req.params.address, req.params.n, req.params.x);
            
            if (pChainTransactions == 1) {
                res.send(JSON.parse('{"result":"api call rejected or not enough transactions"}'));
            } else {
                res.send(pChainTransactions);
            }
        } else if ((req.params.address).slice(0, 2) == C_CHAIN) {
            cChainTransactions = await cChainMethods.getXTransactionsAfterNthFromAddressFromCChain(req.params.address, req.params.n, req.params.x);
    
            res.send(cChainTransactions);
        } else {
            res.send(JSON.parse('{"result":"wrong chain"}'));
        }
    },
    getXPendingTransactionsAfterNth: async function (req, res) {
        if (req.params.n > 0 && req.params.x > 0) {
            cChainTransactions = await cChainMethods.getXPendingTransactionsAfterNthFromCChain(req.params.n, req.params.x);
    
            if (cChainTransactions[0] == 1) {
                res.send(cChainTransactions[1]);
            } else {
                res.send(cChainTransactions[1]);
            }
        } else {
            res.send(JSON.parse('{"result":"n and x < 0"}'));
        }
    },
    getRecentTransactionsFromXChain: async function (req, res) {
        xChainTransaction = await xChainMethods.getRecentTransactions();
    
        if (xChainTransaction[0] == 1) {
            res.send(xChainTransaction[1]);
        } else {
            res.send(xChainTransaction[1])
        }
    },
    getRecentTransactionsFromPChain: async function (req, res) {
        pChainTransaction = await pChainMethods.getRecentTransactions();
    
        if (pChainTransaction[0] == 1) {
            res.send(pChainTransaction[1]);
        } else {
            res.send(pChainTransaction[1])
        }
    }
};

