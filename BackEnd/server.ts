import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import ErrorHandler from './MiddleWare/routeNotFound'

// Create Server
const server = express()

// Handle CORS
server.use(cors())

//How we send the data back
server.use(express.json())

// Where to save the files

//enable file uploading

//Parse the body as JSON
server.use(bodyParser.json())

// Handle errors (route not found)
server.use('*', ErrorHandler)
