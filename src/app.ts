
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Basic health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'School SaaS Backend' });
});

app.use('/api', routes);

export { app };
