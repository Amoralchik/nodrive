import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
// import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as passport from 'passport';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { origin: 'http://localhost', credentials: true },
  });
  app.use(cookieParser());
  app.set('trust proxy', 1);
  app.use(
    session({
      name: 'app-session-id',
      secret: 'nestapp',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        expires: new Date(Date.now() + 3600000),
        sameSite: true,
      },
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
