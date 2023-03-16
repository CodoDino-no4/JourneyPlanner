import mongoose, { Schema } from 'mongoose';
import { ticketTypeEnum } from '../utils/ticketTypeEnum';

interface ITicket {
  code: number;
  created_on: Date;
  ticket_type: ticketTypeEnum;
  expires: Date;
  user: Schema.Types.ObjectId;
}

const ticketSchema = new mongoose.Schema<ITicket>({
  code: { type: Number, required: true, unique: true },
  created_on: { type: Date, required: true },
  ticket_type: { type: String, enum: ticketTypeEnum, required: true },
  expires: { type: Date, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

ticketSchema.methods.getType = function getType() {
  return this.ticket_type;
};

ticketSchema.methods.getExpiry = function getExpiry() {
  return this.expires;
};

export const Ticket = mongoose.model<ITicket>(
  'Ticket',
  ticketSchema,
  'tickets'
); // model created from schema
