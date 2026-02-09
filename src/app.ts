import express from 'express';
import cors from 'cors';
import hbs from 'hbs';
import path from 'path';
import methodOverride from 'method-override';

// Import routes
import routes from './routes/index.route';

// Import middleware
import { notFound, errorHandler } from './middlewares';
import { notFoundView } from './middlewares/errors/notFoundView';
import { viewErrorHandler } from './middlewares/errors/viewErrorHandler';

const app = express();

// Security middleware
// app.use(helmet());
app.use(cors());
app.use(methodOverride('_method'));

// View engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Register partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/', routes);

// Midleware untuk tangani error pada request halaman views
app.use(notFoundView);
app.use(viewErrorHandler);

// Error handling middleware (harus di akhir)
app.use(notFound);
app.use(errorHandler);

export default app;
