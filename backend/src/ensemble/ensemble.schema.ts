import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ensemble extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  createdBy: string; // Reference to the user who created it

  @Prop({ type: [String], default: [] }) // Array of user IDs
  registeredUsers: string[];
}

export const EnsembleSchema = SchemaFactory.createForClass(Ensemble);

