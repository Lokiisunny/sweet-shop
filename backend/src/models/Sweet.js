import { Schema, model } from 'mongoose';

const sweetSchema = new Schema({
  name: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 0 }
}, { timestamps: true });

export const Sweet = model('Sweet', sweetSchema);


