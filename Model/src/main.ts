import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as ejs from 'ejs';
import { join } from 'path';
import { Request } from 'express';
import { createServer } from 'http';
import * as corsAnywhere from 'cors-anywhere';
import cors = require("cors")
async function bootstrap() {
  const app = await NestFactory.create< NestExpressApplication>(AppModule,{cors:true});

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.enableCors({
    origin: 'http://localhost:3001', // Set this to your frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization,cookie',
  });
   await app.listen(3000);
  app.useStaticAssets(join(__dirname, '..', 'views'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
}
bootstrap();
