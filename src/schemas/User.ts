import mongoose from 'mongoose';

export type Calendar = {
  countryCode: string;
  year: number;
  holidays?: string[];
};

export type User = {
  id: number;
  calendars: Calendar[];
};

interface IUserSchema extends mongoose.Document, User {
  id: number;
  calendars: Calendar[];
}

const userSchema = new mongoose.Schema<IUserSchema>({
  id: {
    type: Number,
    required: true
  },
  calendars: [
    {
      countryCode: {
        type: String,
        required: true
      },
      year: {
        type: Number,
        required: true
      },
      holidays: {
        type: [String]
      }
    }
  ]
});

export const User = mongoose.model<IUserSchema>('users', userSchema);
