import createServer from './lib/server'
import morgan from 'morgan'

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const middleWares = {
  top: [
    morgan('dev')
  ]
}

const server = createServer(middleWares)

server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});