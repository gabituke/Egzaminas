import express from 'express'

import db from '../database/connect.js'


const Router = express.Router()

Router.post('/', async (req, res) => {
    try {
        //prisijungusio vartotojo priskyrimas
       
        await db.Ratings.create(req.body)
        res.send('Įvertinimas sėkmingai sukurtas')
    } catch (error) {
        console.log(error)
        res.status(500).send('Įvyko serverio klaida')
    }
})

export default Router