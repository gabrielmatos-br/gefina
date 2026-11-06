import supertest from 'supertest';
import { beforeEach, afterAll, describe, it, expect } from 'vitest';

import pool from './database.ts';

import app from './app.ts';

const user = {
    id: 0,
    email: 'user@teste.com.br'
};
const customer = {
    id: 0,
    email: 'client@teste.com.br'
};
const invoice = { id: 0 }

async function populate(): Promise<void> {
    const connectUser = await pool.query(
        `
            INSERT INTO users (name, email, password_hash)
            VALUES('Usuário de teste', $1, 'placeholder')
            RETURNING id;
        `,
        [user.email]
    );
    user.id = connectUser.rows[0].id;

    const connectCustomer = await pool.query(
        `
            INSERT INTO customers (user_id, name, email)
            VALUES($1, 'Cliente de teste', $2)
            RETURNING id;
        `,
        [user.id, customer.email]
    );
    customer.id = connectCustomer.rows[0].id

    const connectInvoice = await pool.query(
        `
            INSERT INTO invoices (customer_id, amount, status, issue_date, due_date)
            VALUES ($1, 125050, 'pending', '2026-10-01', '2026-10-31')
            RETURNING id;
        `,
        [customer.id]
    );
    invoice.id = connectInvoice.rows[0].id;
}

async function clear(): Promise<void> {
    await pool.query(
        `
            DELETE FROM invoices
            WHERE customer_id IN (SELECT id FROM customers WHERE email = $1);
        `,
        [customer.email]
    );
    await pool.query(
        `
            DELETE FROM customers
            WHERE email = $1;
        `,
        [customer.email]
    );
    await pool.query(
        `
            DELETE FROM users
            WHERE email = $1;
        `,
        [user.email]
    );
}

const request = supertest(app);

describe('rotas de fatura', () => {
    beforeEach(async () => {
        await clear();
        await populate();
    });
    afterAll(async () => {
        await clear();
        await pool.end();
    });
    it('devolve a relação de faturas', async () => {
        const response = await request.get('/api/invoices');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
})