import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ensemble } from './ensemble.schema';

@Injectable()
export class EnsembleService {
  constructor(
    @InjectModel(Ensemble.name) private readonly ensembleModel: Model<Ensemble>,
  ) {}

  async createEnsemble(ensembleData: Partial<Ensemble>): Promise<Ensemble> {
    const newEnsemble = new this.ensembleModel(ensembleData);
    return newEnsemble.save();
  }

  async registerUser(ensembleId: string, userId: string): Promise<void> {
    const ensemble = await this.ensembleModel.findById(ensembleId);
    if (!ensemble) {
      throw new NotFoundException('Ensemble not found');
    }

    if (ensemble.registeredUsers.includes(userId)) {
      throw new BadRequestException('User already registered in this ensemble');
    }

    ensemble.registeredUsers.push(userId);
    await ensemble.save();
  }

  async getAllEnsembles(): Promise<Ensemble[]> {
    return this.ensembleModel.find().exec(); // Fetch all ensembles from the database
  }
  
}
