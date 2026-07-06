import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Expense Tracker API',
            version: '1.0.0',
            description: 'A learning project — full CRUD on expenses'
        },
        servers: [{ url: '/' }]
    },
    apis: ['./src/routes/*.js']
};

export const swaggerSpec = swaggerJsdoc(options);