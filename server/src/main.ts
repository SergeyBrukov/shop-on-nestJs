import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as path from "path";

// app.use("/files", express.static(path.join(__dirname, "../files")))
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix("api");
  app.useStaticAssets(path.join(__dirname, "../uploads"), {
    prefix: "/api/uploads"
  });

  const config = new DocumentBuilder()
    .setTitle("Shop")
    .setDescription("The shop API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(3001);
}

bootstrap();
