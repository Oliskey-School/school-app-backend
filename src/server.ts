import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env';
// generic routing init (will import actual routes later)
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

const start = () => {
    try {
        app.listen(config.port, () => {
            console.log(`🚀 Server running on port ${config.port} in ${config.env} mode`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

start();
