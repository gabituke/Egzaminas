import express from 'express'
import db from '../database/connect.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const posts = await db.Posts.findAll()
        res.json(posts)
    } catch {
        //Pirmas variantas grąžinti tik statusą
        //res.status(500).end()

        //Antras variantas grąžinti tik statusą
        //res.sendStatus(500)

        res.status(500).send('Įvyko serverio klaida')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id)
        res.json(post)
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

router.post('/', async (req, res) => {
    try {
        new db.Posts(req.body).save()
        res.json({ message: 'Knyga sekmingai įrašyta' })
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id)
        post.update(req.body)
        res.json({ message: 'Įrašas sėkmingai atnaujintas'})
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id)
        post.destroy()
        res.json({ message: 'Knyga sėkmingai ištrintas' })
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})


export default router