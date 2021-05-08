const { Pool } = require('pg');
const fs = require('fs');

const request = require('supertest');
const apiServer = require('../../server.js');

const reset = fs.readFileSync(__dirname + '/reset.sql').toString();

const resetTestDB = () => {
    return new Promise (async (res, rej) => {
        try {
            const db = new Pool();
            await db.query(reset)
            res('Test DB reset')
        } catch(err){
            rej('Could not reset TestDB')
        }
    }) 
}

global.request = request
global.app = apiServer
global.resetTestDB = resetTestDB
global.port = process.env.PORT || 5000


