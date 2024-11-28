import {
  Controller,
  Patch,
  Param,
  Body,
  Post,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EnsembleService } from './ensemble.service';
import { Ensemble } from './ensemble.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ensemble')
export class EnsembleController {
  constructor(private readonly ensembleService: EnsembleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createEnsemble(
    @Body() ensembleData: Partial<Ensemble>,
    @Req() req: any,
  ): Promise<Ensemble> {
    const userId = req.user.userId;
    return this.ensembleService.createEnsemble({
      ...ensembleData,
      createdBy: userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/register')
  async registerUser(
    @Param('id') ensembleId: string,
    @Req() req: any,
  ): Promise<string> {
    const userId = req.user.userId;
    await this.ensembleService.registerUser(ensembleId, userId);
    return `User ${userId} registered successfully to ensemble ${ensembleId}`;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllEnsembles(): Promise<Ensemble[]> {
    return this.ensembleService.getAllEnsembles();
  }
}
