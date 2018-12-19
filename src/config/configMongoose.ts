import * as mongoose from 'mongoose';

const dbConfig = {
  'url': 'mongodb://test777:test777@ds125293.mlab.com:25293/recognize',
}

export const mongooseConnect = () => {
  mongoose.connection.openUri(dbConfig.url)
  .once('open', () => console.log('Connected to database: ' + dbConfig.url))
  .on('error', (error) => console.warn('Database connection error', error));
}