const config = require('config');

// Get AWS Credentialst from env config
const AWSCredentials = config.get('aws');


// Amazon SES config
exports.SESConfig = {
  apiVersion: '2010-12-01',
  region: AWSCredentials.region
};
