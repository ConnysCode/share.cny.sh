FROM node:20.5.0

WORKDIR /usr/src
COPY . . 

RUN npm i
RUN npx tsc

CMD ["npm", "run", "prod"]