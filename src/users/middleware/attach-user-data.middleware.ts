import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class AttachUserDataMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    req.user = req.body;
    next();
  }
}
