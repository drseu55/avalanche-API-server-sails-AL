/**
 * NetworkController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dotenv = require('dotenv');
const axios = require("axios");
 
dotenv.config();

module.exports = {
    getNetWorkActivity: async function (req, res) {
        let result = [];
    
        await axios.post(process.env.P_CHAIN_BC_CLIENT_BLOCK_ENDPOINT, {
            jsonrpc: '2.0',
            id: 1,
            method: 'platform.getTotalStake',
            params: {}
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => {
            result.push(response.data.result.stake);
        }).catch(error => {
            if(!error.response) {
                console.log("connection refused to avalanche client");
                res.send(JSON.parse('{"result":"connection refused to avalanche client"}'));
                return;
            } else {
                console.log(error.response.data);
                res.send(error.response.data);
                return;
            }
        });
    
        await axios.post(process.env.P_CHAIN_BC_CLIENT_BLOCK_ENDPOINT, {
            jsonrpc: '2.0',
            id: 1,
            method: 'platform.getCurrentValidators',
            params: {}
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => {
            result.push(response.data.result.validators.length);
        }).catch(error => {
            if(!error.response) {
                console.log("connection refused to avalanche client");
                res.send(JSON.parse('{"result":"connection refused to avalanche client"}'));
                return;
            } else {
                console.log(error.response.data);
                res.send(error.response.data);
                return;
            }
        });
    
        await axios.post(process.env.C_CHAIN_BC_CLIENT_BLOCK_ENDPOINT, {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_blockNumber',
            params: []
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => {
            result.push(parseInt(response.data.result));
        }).catch(error => {
            if(!error.response) {
                console.log("connection refused to avalanche client");
                res.send(JSON.parse('{"result":"connection refused to avalanche client"}'));
                return;
            } else {
                console.log(error.response.data);
                res.send(error.response.data);
                return;
            }
        });
    
        await axios.post(process.env.P_CHAIN_BC_CLIENT_BLOCK_ENDPOINT, {
            jsonrpc: '2.0',
            id: 1,
            method: 'platform.getHeight',
            params: {}
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => {
            result.push(response.data.result.height);
        }).catch(error => {
            if(!error.response) {
                console.log("connection refused to avalanche client");
                res.send(JSON.parse('{"result":"connection refused to avalanche client"}'));
                return;
            } else {
                console.log(error.response.data);
                res.send(error.response.data);
                return;
            }
        });
    
        res.send(result);
    }
};

