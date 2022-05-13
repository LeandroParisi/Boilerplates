/* eslint-disable @typescript-eslint/no-floating-promises */
import 'reflect-metadata'
import { Server } from './Server'

const server : Server = new Server()

server.Start()
