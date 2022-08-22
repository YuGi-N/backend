import e, { Request, Response, NextFunction } from 'express'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.session && req.session.user_id){ 
        next();
    }
    else {
        res.status(401).send('Unauthorized');
    }

}

export default authMiddleware;