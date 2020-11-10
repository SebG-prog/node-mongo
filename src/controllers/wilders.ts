// controllers/wilders.js
import createError from 'http-errors';
import { Request, Response } from 'express';

import WilderModel from '../models/Wilder';

const wildController = {
  create: async (req: Request, res:Response): Promise<void> => {
    await WilderModel.init();
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.json({ success: true, result });
  },
  retrieve: async (req: Request, res: Response): Promise<void> => {
    const result = await WilderModel.find();
    if (!result[0]) throw createError(400, 'No wilders found');
    res.json({ sucess: true, result });
  },
  update: async (req: Request, res: Response): Promise<void> => {
    const result = await WilderModel.updateOne({ _id: req.params._id }, req.body);
    if (!result.n) throw createError(400, 'No such wilder exists');
    res.send({ success: true, result });
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    WilderModel.deleteOne({ _id: req.params._id })
      .then((result) => {
        if (!result.n) throw createError(400, 'No wilder with such ID was found');
        res.json({ success: true, result });
      });
  },
};

export default wildController;
