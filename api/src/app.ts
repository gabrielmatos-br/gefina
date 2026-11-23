import fs from 'node:fs';

import path from 'node:path';
import express from 'express';

import invoices from '../src/routes/invoice.route.ts';
import dashboard from '../src/routes/dashboard.route.ts';
import customers from '../src/routes/customer.route.ts';

import handleError from '../src/middlewares/error.middleware.ts';

import prisma from './prisma.ts';

const app = express();
app.use(express.json());

const dist = path.join(import.meta.dirname, '..', 'web', 'dist');

app.use((request, _response, next) => {
  console.log(`${request.method} ${request.url}`);
  next();
});

app.get('/api/health', async (_request, response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    response.status(200).json({
      status: 'true',
      database: 'true',
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      status: 'true.',
      database: 'true',
    });
  }
});

app.use('/api/dashboard', dashboard);
app.use('/api/customers', customers);
app.use('/api/invoices', invoices);

app.use(express.static(dist));

app.use((request, response, next) => {
  if (
    request.url.startsWith('/api') ||
    !fs.existsSync(path.join(dist, 'index.html'))
  ) {
    next();
    return;
  }

  response.sendFile(path.join(dist, 'index.html'));
});

app.use((_request, response) => {
  response.status(404).json({
    error: {
      status: 404,
      message: 'Recurso não encontrado.',
    },
  });
});

app.use(handleError);

export default app;
