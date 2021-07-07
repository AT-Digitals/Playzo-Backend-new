# Pull code
cd /var/www/html/fabo-api/
git checkout master
git pull origin master

# Build and deploy
yarn install
yarn run build
pm2 restart server