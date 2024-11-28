import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ensemble, EnsembleSchema } from './ensemble.schema';
import { EnsembleService } from './ensemble.service';
import { EnsembleController } from './ensemble.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ensemble.name, schema: EnsembleSchema }]),
  ],
  controllers: [EnsembleController],
  providers: [EnsembleService],
})
export class EnsembleModule {}
