const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const shoppingRoutes = require('./routes/shoppingRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();
const origins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',').map((value) => value.trim()).filter(Boolean);

app.disable('x-powered-by');
app.use(cors({
  origin(origin, callback) {
    // Requests without Origin are common in curl/Postman and are allowed.
    if (!origin || origins.includes('*') || origins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked origin: ${origin}`));
  }
}));
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => res.json({
  success: true,
  message: 'Member 2 REST API',
  endpoints: ['/health', '/api/tasks', '/api/shopping', '/api/reminders', '/api/conversations']
}));
app.get('/health', (req, res) => res.json({ success: true, message: 'API is running', storage: 'json-file' }));

app.use('/api/tasks', taskRoutes);
app.use('/api/shopping', shoppingRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/conversations', conversationRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
