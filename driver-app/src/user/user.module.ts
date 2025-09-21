import { Module } from '@nestjs/common';
import { InMemoryUserRepository } from './user.repository';

//wiring to share services across app
@Module({
  controllers: [],
  providers: [InMemoryUserRepository],
  exports: [InMemoryUserRepository]
})
export class UserModule {}
