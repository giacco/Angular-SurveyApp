import  *  as express from 'express';
import * as cors from 'cors';
import questionRoute from './routes/questionRoute'
import morganMiddleware from './middleware/loggerMiddleware'
import * as helmet from 'helmet';

const app = express() 
const port = 3000
app.use(helmet())
app.use(morganMiddleware);
app.use(cors());
app.use(express.json())

app.use('/',questionRoute);
/** catch 404 and forward to error handler */
app.use('*', (req:express.Request, res:express.Response) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist',
  });
});

app.listen(port, () => {
  console.log(`Survey Server Listen: http://0.0.0.0:${port}`)
})
