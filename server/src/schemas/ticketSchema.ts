import mongoose from 'mongoose';

interface ITicket {
  is_valid: boolean;
  code: string;
  created_on: Date;
  ticket_type: string;
  expires: Date;
  user_id: string;
}

const ticketSchema = new mongoose.Schema<ITicket>({
  is_valid: { type: Boolean, required: true },
  code: { type: String, required: true },
  created_on: { type: Date, required: true },
  ticket_type: { type: String, required: true },
  expires: { type: Date, required: true },
  user_id: { type: String, required: true },
});

ticketSchema.methods.getValidity = function getValidity() {
  return this.isValid;
};

ticketSchema.methods.getType = function getType() {
  return this.ticket_type;
};

ticketSchema.methods.getExpiry = function getExpiry() {
  return this.expires;
};

export const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema); // model created from schema
