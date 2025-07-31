import express from 'express';
import cors from 'cors';
import movies from './routes/movies.js'
import users from './routes/users.js';
// import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 

app.use('/movies', movies);
app.use('/users', users);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});