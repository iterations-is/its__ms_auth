import 'dotenv/config';
import express, { json } from 'express';

import { aboutRouter } from '../src-ms';
import { MS_EXPRESS_PORT } from './constants';
import { externalRouter, internalRouter } from './routes';

const app = express();

app.use(json());

app.use('/auth-service', aboutRouter);
app.use('/auth-service', externalRouter);
app.use('/auth-service', internalRouter);

app.listen(MS_EXPRESS_PORT, () => {
	console.log('http://localhost:' + MS_EXPRESS_PORT);
});
