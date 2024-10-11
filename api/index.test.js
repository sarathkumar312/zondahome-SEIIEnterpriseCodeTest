const request = require('supertest');
const express = require('express');
const app = express();
const subdivisions = require('./subdivision.json');

app.get('/api/subdivisions', (req, res) => {
    res.json(subdivisions);
});


describe('GET /api/subdivisions', () => {
    it('should return subdivision data', async () => {
        const res = await request(app).get('/api/subdivisions');
        expect(res.statusCode).toEqual(200);
        expect(res.body.subdivisions).toHaveLength(1000); // Assuming 1000 subdivisions
    });
});
