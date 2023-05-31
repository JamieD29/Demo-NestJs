import { Module } from '@nestjs/common';
import { NinjasController } from './ninjas/ninjas.controller';
import { NinjasModule } from './ninjas/ninjas.module';
import { NinjasService } from './ninjas/ninjas.service';

@Module({
  imports: [NinjasModule],
  controllers: [NinjasController],
  providers: [NinjasService],
})
export class AppModule {}
