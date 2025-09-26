import { Router } from 'express';
import { z } from 'zod';
import { Sweet } from '../models/Sweet.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

export const sweetsRouter = Router();

const sweetCreateSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  price: z.number().positive(),
  quantity: z.number().int().nonnegative()
});

const sweetUpdateSchema = sweetCreateSchema.partial();

sweetsRouter.post('/', authenticate, requireAdmin, async (req, res) => {
  const parsed = sweetCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid input', errors: parsed.error.flatten() });
  const sweet = await Sweet.create(parsed.data);
  res.status(201).json(sweet);
});

sweetsRouter.get('/', authenticate, async (_req, res) => {
  const sweets = await Sweet.find().sort({ name: 1 });
  res.json(sweets);
});

sweetsRouter.get('/search', authenticate, async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const where = {};
  if (typeof name === 'string') where.name = { $regex: name, $options: 'i' };
  if (typeof category === 'string') where.category = { $regex: category, $options: 'i' };
  if (typeof minPrice === 'string' || typeof maxPrice === 'string') {
    where.price = {};
    if (typeof minPrice === 'string') where.price.$gte = Number(minPrice);
    if (typeof maxPrice === 'string') where.price.$lte = Number(maxPrice);
  }
  const sweets = await Sweet.find(where).sort({ name: 1 });
  res.json(sweets);
});

sweetsRouter.put('/:id', authenticate, requireAdmin, async (req, res) => {
  const parsed = sweetUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid input', errors: parsed.error.flatten() });
  const id = req.params.id;
  try {
    const sweet = await Sweet.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.json(sweet);
  } catch {
    res.status(404).json({ message: 'Sweet not found' });
  }
});

sweetsRouter.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const s = await Sweet.findByIdAndDelete(id);
    if (!s) return res.status(404).json({ message: 'Sweet not found' });
    res.status(204).send();
  } catch {
    res.status(404).json({ message: 'Sweet not found' });
  }
});

sweetsRouter.post('/:id/purchase', authenticate, async (req, res) => {
  const id = req.params.id;
  const qty = Number((req.body?.quantity ?? 1));
  if (!Number.isInteger(qty) || qty <= 0) return res.status(400).json({ message: 'Invalid quantity' });
  try {
    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    if (sweet.quantity < qty) return res.status(400).json({ message: 'Insufficient stock' });
    sweet.quantity -= qty;
    const updated = await sweet.save();
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

sweetsRouter.post('/:id/restock', authenticate, requireAdmin, async (req, res) => {
  const id = req.params.id;
  const qty = Number((req.body?.quantity ?? 1));
  if (!Number.isInteger(qty) || qty <= 0) return res.status(400).json({ message: 'Invalid quantity' });
  try {
    const sweet = await Sweet.findByIdAndUpdate(id, { $inc: { quantity: qty } }, { new: true });
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.json(sweet);
  } catch {
    res.status(404).json({ message: 'Sweet not found' });
  }
});


