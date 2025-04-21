import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    CardModule,
  ],
})
export class AppModule {}
