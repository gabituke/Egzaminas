import express from 'express'
import db from '../database/connect.js'
import { booksValidator } from '../middleware/validate.js'
import { auth, adminAuth } from '../middleware/auth.js'

const Router = express.Router()


Router.get('/', async (req, res) => {
    try {
        const books = await db.Books.findAll()
        res.json(books)
    } catch {
        //Pirmas variantas grąžinti tik statusą
        //res.status(500).end()

        //Antras variantas grąžinti tik statusą
        //res.sendStatus(500)

        res.status(500).send('Įvyko serverio klaida')
    }
})



Router.get('/single/:id', adminAuth, async (req, res) => {
    try {
        const books = await db.Books.findByPk(req.params.id)
        res.json(books)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išsaugant duomenis')
    }
})

Router.post('/new', booksValidator, async (req, res) => {
    try {
        req.body.userId = req.session.user.id
        
        await db.Books.create(req.body)
        res.send('Knyga sėkmingai issaugota')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išsaugant duomenis')
    }
})

Router.put('/edit/:id', adminAuth, booksValidator, async (req, res) => {
    try {
        const book = await db.Books.findByPk(req.params.id)
        await book.update(req.body)
        res.send('Knyga sėkmingai atnaujinta')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išsaugant duomenis')
    }
})

Router.delete('/delete/:id', adminAuth, async (req, res) => {
    try {
        const book = await db.Books.findByPk(req.params.id)
        await book.destroy()
        res.send('Knyga sėkmignai ištrinta')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

export default Router