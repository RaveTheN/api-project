# api-project
Node.js API project

sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
sudo -u postgres createuser development --createdb --pwprompt
sudo -u postgres psql (per accedere al db)
postgres=# \du per vedere se è tutto corretto
\l per controllare la lista dei database
\q per uscire
sudo -u postgres createdb name_db --owner=development

# Per installare PRISMA e creare model e schema:
npm install @prisma/client
npm install --save-dev prisma
npx prisma init
npx prisma migrate dev --name init
