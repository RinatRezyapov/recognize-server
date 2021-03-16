import * as mongoose from 'mongoose';

const dbConfig = {
  'url': `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/recognize?retryWrites=true&w=majority`,
}

export const mongooseConnect = () => {
  mongoose.connection.openUri(dbConfig.url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(r => console.log('Connected to database', process.env.DB_HOST))
    .catch(e => console.log('Database connection error', e))
}