FROM node:14.15.4-alpine

LABEL version="1.0"
LABEL description="This is the base docker image for the SQL-Client Express App"

WORKDIR /app

COPY ["package.json", "./"]
RUN node -v
RUN ls
RUN npm install
COPY . .

EXPOSE 5000

CMD npm start