FROM node:20-alpine AS stage

WORKDIR /app/ui

COPY ui/ .

RUN npm install --silent

RUN npm run build




FROM rust:1.85.0 AS builder

COPY . /app

RUN rustup target add x86_64-unknown-linux-gnu

WORKDIR /app

COPY --from=stage /app/ui/dist/ /app/ui/dist

RUN cargo build --target x86_64-unknown-linux-gnu --release




FROM debian:stable-slim

COPY --from=builder  /app/target/x86_64-unknown-linux-gnu/release/obscura /usr/local/bin

CMD ["obscura"]