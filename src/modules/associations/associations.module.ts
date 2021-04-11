import { Module } from '@nestjs/common';
import { associationsProviders } from './associations.providers';

@Module({
  providers: [...associationsProviders],
})
export class AssociationsModule {}
