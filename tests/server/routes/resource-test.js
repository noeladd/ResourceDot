/*global require describe beforeEach it */
const expect = require('chai').expect;

const db = require('../../../server/db');

const supertest = require('supertest');

let resourceInfo ={
    title: ''
}