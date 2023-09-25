FROM oven/bun

WORKDIR /usr/src
COPY . . 

RUN bun install
RUN bun run build

CMD ["bun", "run", "prod"]