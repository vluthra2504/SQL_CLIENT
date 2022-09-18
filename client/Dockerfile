FROM node:14.15.4-alpine

LABEL version="1.0"
LABEL description="This is the base docker image for the SQL-Client React App"

WORKDIR /app

COPY ["package.json","./"]
RUN node -v
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]