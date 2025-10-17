import { execSync } from 'node:child_process'
if (process.env.DEPLOY_TARGET !== 'GCP') { console.error('DEPLOY_TARGET must be GCP for this script'); process.exit(1) }
try { execSync('gsutil -m rsync -R ./out gs://<YOUR_BUCKET_NAME>', { stdio: 'inherit' }); console.log('Deployed to GCP Cloud Storage. Attach CDN as needed.') } catch (e) { process.exit(1) }
