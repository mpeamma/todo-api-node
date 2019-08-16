import { SecretsManager } from 'aws-sdk';

export function getSecret(region, secretId) {
  const client = new SecretsManager({
    region: region
  })

  return new Promise((resolve, reject) => {
    client.getSecretValue({SecretId: secretId}, function(err, data) {
      if (err) {
        return reject(err);
      }
      else {
        return resolve(data.SecretString);
      }
    });
  });
}
