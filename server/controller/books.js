import express from 'express'
import db from '../database/connect.js'
import { booksValidator } from '../middleware/validate.js'
import { auth, adminAuth } from '../middleware/auth.js'

const Router = express.Router()

//Admino užsakymų sąrašas
Router.get('/', adminAuth, async (req, res) => {
    try {
        const books = await db.Books.findAll({
            include: [
                { 
                    model: db.Users,
                    attributes: ['first_name', 'last_name']
                },
                { 
                    model: db.Services,
                    attributes: ['name']
                }
            ]
        })
        res.json(books)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

//Vartotojo užsakymai
Router.get('/user/', auth, async (req, res) => {
    //Laikinas sprendimas
    const user_id = req.session.user.id

    try {
        const books = await db.Books.findAll({
            where: { userId: user_id },
            include: [
                { 
                    model: db.Services, 
                    include: db.Saloons
                }, 
                db.Workers,
                db.Ratings
            ],
            group: ['id']
        })
        res.json(books)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
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