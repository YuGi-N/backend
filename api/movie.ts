import e, { Router } from 'express';
import { movieCollection } from '../utils/conn';
import { ObjectId } from 'mongodb';

const router = Router();

router.get('/', async (req, res) => {
    
    try {
        const movies = await movieCollection.find({}).toArray();
        res.status(200).json(movies);
    }
    catch(error) {
        res.status(400).send('Failed to find movies');
    }

});

router.post('/', async (req, res) => {
    
    const movieDocument = {
        movieName: req.body.movieName,
        rating: req.body.rating,
        cast: req.body.cast,
        genre: req.body.genre,
        releaseDate: new Date(req.body.releaseDate),
    }

    try {
        const movie = await movieCollection.insertOne(movieDocument);
        res.status(200).send('Successfully created movie');
    }
    catch(error) {
        res.status(400).send('Failed to create movie');
    }

})

router.get('/:id', async (req, res) => {
    
    const id = new ObjectId(req.params.id);

    try {
        const movie = await movieCollection.findOne({"_id": id});
        res.status(200).json(movie);
    } catch (error) {
        res.status(400).send('Failed to find movie');
    }

});

router.put('/:id', async (req, res) => {
    const id = new ObjectId(req.params.id);

    const updates = {
        $set: {
            movieName: req.body.movieName,
            rating: req.body.rating,
            cast: req.body.cast,
            genre: req.body.genre,
            releaseDate: new Date(req.body.releaseDate),
        }
    }

    try {
        const movie = await movieCollection.updateOne({"_id": id}, updates);
        res.status(200).send('Successfully updated movie');
    } catch (error) {
        res.status(400).send('Failed to update movie')
    }

});

router.delete('/:id', async (req, res) => {
    const id = new ObjectId(req.params.id);

    try {
        const movie = await movieCollection.deleteOne({"_id": id});
        res.status(200).send(`Successfully deleted movie ${id}`);
    } catch (error) {
        res.status(400).send('Failed to find movie');
    }

});

export { router as MovieRouter };