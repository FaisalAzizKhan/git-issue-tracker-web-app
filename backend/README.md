```bash 

Migration in Mac 

bunx dotenv -e .env prisma migrate dev --name 1
bunx dotenv -e .env -- bunx prisma migrate deploy 1
bunx dotenv -e .env -- bunx prisma generate

# Git Push Command for Mac
git add . && git commit -m "March 14: readme updated" && git push

# Some User emails for this project.
user1@git.com user3@git.com user2@git.com

 
http://localhost:5020

# .env file requirement

# Server Post
SERVER_PORT = 5020
NODE_ENV = production

# PostgreSQL Database
PG_DB_HOST =  
PG_DB_USER =  
PG_DB_NAME =       
PG_DB_PASSWORD =  
PG_DB_PORT =  
DATABASE_URL = "postgresql://${PG_DB_USER}:${PG_DB_PASSWORD}@${PG_DB_HOST}:${PG_DB_PORT}/${PG_DB_NAME}"

# JWT
JWT_SECRET_KEY = "i3@t!82xK%eJnv7sZLqhP@3MfrDqs4FopZCq"



 