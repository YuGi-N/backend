import { Router } from 'express';
import { userCollection } from '../utils/conn';

const router = Router();

router.post('/register', async (req, res) => {
    
    const userDocument = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        country: req.body.country,
        city: req.body.city,
        state: req.body.state,
        message: req.body.message,
    }

    try {
        const user = await userCollection.insertOne(userDocument);
        res.status(200).send('Successfully registered user');
    } catch (error) {
        res.status(400).send('Failed to register user');
    }
    
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userCollection.findOne({ email : email });
        
        if(user && user.password === password) {
            if(req.session) {
                req.session.user_id = user._id;
            }
            res.status(200).send('Successfully logged in');
        }
        else {
            res.status(400).send('Invalid credentials');
        }

    } catch (error) {
        res.status(400).send('Unable to find user');
    }
});

router.post('/logout', async (req, res) => {
    if(req.session){
        req.session = null;
        res.status(200).send('Successfully logged out');
    }
})

export { router as UserRouter };