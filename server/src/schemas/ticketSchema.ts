import mongoose, { Schema } from 'mongoose';
import { ticketTypeEnum } from '../utils/ticketTypeEnum';

interface ITicket {
  code: number;
  created_on: Date;
  ticket_type: ticketTypeEnum;
  ticket_price: number;
  expires: Date;
  user: Schema.Types.ObjectId;
}

const ticketSchema = new mongoose.Schema<ITicket>({
  code: { type: Number, required: true, unique: true },
  created_on: { type: Date, required: true },
  ticket_type: { type: String, enum: ticketTypeEnum, required: true },
  ticket_price: { type: Number, required: true },
  expires: { type: Date, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema); // model created from schema
