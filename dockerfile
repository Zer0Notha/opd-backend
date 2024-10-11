FROM node:latest

WORKDIR /backend

COPY package*.json ./
COPY ./src ./src
COPY ./prisma ./prisma

# Running npm install
RUN npm install

RUN npm i typescript -g

RUN npm install -g ts-node-dev

RUN npm install -g ts-node

RUN npm install -g @types/node

COPY . .

CMD ["npm", "run", "postinstall"]