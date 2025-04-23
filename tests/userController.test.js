const userController = require('../controllers/userController');
const httpMocks = require('node-mocks-http');

describe('User Controller - storeUser', () => {
    it('should store user data successfully', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/store-user',
            body: {
                fullname: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+1234567890',
                country: 'USA',
            },
        });

        const res = httpMocks.createResponse();
        await userController.storeUser(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toHaveProperty('message', 'User created successfully');
    });
});
