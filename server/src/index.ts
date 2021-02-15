import express from 'express'
import http from 'http'
import path from 'path'
import cors from 'cors'
import PointingService from './pointing/pointing-service'
import RetroService from './retro/retro-service'

const port = process.env.PORT || 4001

const app = express()
// app.use(cors())
// app.use(express.static(path.resolve(path.join(__dirname, '../../frontend/public'))))
// app.get('*', (req, res, next) => {
//     res.sendFile(path.resolve(path.join(__dirname + '../../frontend/public/index.html')))
// })
// console.log(path.resolve(path.join(__dirname, '../../frontend/public')))
// console.log(path.resolve(__dirname + '../../frontend/public/index.html'))

const server = http.createServer(app)

new PointingService(server)
new RetroService(server)

server.listen(port, () => console.log(`Listening on port ${port}`))
