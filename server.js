const express = require('express');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const logger = require('./utils/logger');

const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/admin', adminRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.log(`Server is running on port ${PORT}`);
});
