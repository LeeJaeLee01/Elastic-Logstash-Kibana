import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async (req, res) => {
    res.status(200).send("Hello BB")
})

app.listen('3030', () => {
    console.log('open 3030')
})