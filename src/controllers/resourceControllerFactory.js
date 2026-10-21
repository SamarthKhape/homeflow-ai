function makeController(service, validator) {
  return {
    list: async (req, res, next) => {
      try {
        const items = await service.list(req.query);
        res.json({ success: true, data: items, count: items.length });
      } catch (err) { next(err); }
    },
    get: async (req, res, next) => {
      try {
        const item = await service.getById(req.params.id);
        if (!item) return res.status(404).json({ success: false, error: { message: 'Record not found' } });
        res.json({ success: true, data: item });
      } catch (err) { next(err); }
    },
    create: async (req, res, next) => {
      try {
        const errors = validator(req.body || {});
        if (errors.length) return res.status(400).json({ success: false, error: { message: 'Validation failed', details: errors } });
        const item = await service.create(req.body);
        res.status(201).json({ success: true, data: item });
      } catch (err) { next(err); }
    },
    update: async (req, res, next) => {
      try {
        const errors = validator(req.body || {}, { partial: true });
        if (errors.length) return res.status(400).json({ success: false, error: { message: 'Validation failed', details: errors } });
        if (Object.keys(req.body || {}).length === 0) return res.status(400).json({ success: false, error: { message: 'Request body must contain at least one field' } });
        const item = await service.update(req.params.id, req.body);
        if (!item) return res.status(404).json({ success: false, error: { message: 'Record not found' } });
        res.json({ success: true, data: item });
      } catch (err) { next(err); }
    },
    remove: async (req, res, next) => {
      try {
        const removed = await service.remove(req.params.id);
        if (!removed) return res.status(404).json({ success: false, error: { message: 'Record not found' } });
        res.json({ success: true, data: { id: req.params.id, deleted: true } });
      } catch (err) { next(err); }
    }
  };
}
module.exports = { makeController };
