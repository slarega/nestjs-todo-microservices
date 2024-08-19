import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as process from 'process'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from "@nestjs/common";


// console.log(process.env.RABBITMQ_URL)
async function bootstrap() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
        .setTitle('ToDO List App')
        .setDescription('API документация')
        .setVersion('1.0.0')
        .addApiKey({
              type: "apiKey",
              name: "x-bearer-token",
              in: "header",
              description: "Введите x-bearer-token"
                },
            "x-bearer-token")
        .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup(
        '/api',
        app,
        document,
        // https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/
        {swaggerOptions: {tagsSorter: 'alpha'}}
    )

    app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () =>
        console.log(`API Gateway running on http://localhost:${PORT}/api`))
}
bootstrap();
