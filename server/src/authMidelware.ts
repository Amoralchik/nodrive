import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.session.cookie.expires = new Date(Date.now() + 660000000);
    return next();
  }
}
