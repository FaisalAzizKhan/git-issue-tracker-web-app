sudo chown -R ubuntu:ubuntu /smart_wheels_code/smart-wheels-web-backend

Migration in Mac without Deleting
```bash 
bunx dotenv -e .env prisma migrate dev --name 1
bunx dotenv -e .env -- bunx prisma migrate deploy 1
bunx dotenv -e .env -- bunx prisma generate
```
 

git add . && git commit -m "Mar 12: product update fixed" && git push 
 
bun run start 
 
http://localhost:5020


 