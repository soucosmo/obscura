# Obscura 🔒

Obscura is a secure and efficient system for storing credentials in microservices-based architectures. Built with **Rust**, **fjall** and **Actix**, it ensures that keys, tokens, and secrets are managed reliably and accessible only to authorized services.

## 📖 Origin of the Name

The name **Obscura** was inspired by the expression **"Camera Obscura"**, an optical device used to project images protected from external light. Just as the camera obscura keeps images hidden until they are revealed, **Obscura** protects credentials and secrets until they are accessed by authorized systems.

In addition, "Obscura" refers to the concept of something safe, secure, and inaccessible to those without permission.

## 🔊 Pronunciation

The correct pronunciation of **Obscura** is:

📢 **/ob·sku·ra/** (*ob-scu-ra*)

## 🚀 Features

- 🔐 **Secure storage** of credentials, API keys, and secrets.

- ⚡ **High performance** with **Rust**, **fjall** and **Actix**.

- 🔄 **Automatic rotation** of keys and tokens (optional).

- 📜 **Logs and auditing** for access tracking.

- 📡 **Secure APIs** for credential retrieval and management.

## Demo
![ObscuraFullHD](https://github.com/user-attachments/assets/54392804-fcbe-43f8-9570-2256690877e1)


# Docker Usage Guide

This guide explains how to run the project using Docker.

## Prerequisites
- **Docker:** Ensure Docker is installed and running. [Get Docker](https://docs.docker.com/get-docker/)
- **Project Image:** The Docker image `obscura` must be available locally.

## Running the Container
To start the container, use the following command:

```bash
docker run --name obscura --restart=always -d -v obscura_data:/opt/.obscura -e OBSCURA_PATH="/opt" -e OBSCURA_HOST="0.0.0.0" -p 9797:9797 soucosmo/obscura
```

### Command Breakdown
- **`--name`**: Sets the container name
- **`--restart=always`**: Causes the container to restart if the binary stops, this is recommended to ensure high availability 
- **`-d`**: Runs the container in the background.
- **`-v obscura_data:/opt/.obscura`**: Mounts a persistent volume named `obscura_data`.
- **`-e OBSCURA_PATH="/opt"`**: Sets the storage path, by default it is the user folder.
- **`-e OBSCURA_HOST="0.0.0.0"`**: Sets the environment variable to make the service accessible.
- **`-p 9797:9797`**: Maps port 9797 of the host to port 9797 of the container.
- **`soucosmo/obscura`**: The name of the Docker image.

## Accessing the Service
Once the container is running, access the service at:

```plaintext
http://localhost:9797
```

Replace `localhost` with your server's IP address if running remotely.

## Managing the Container
- **View running containers:**
  ```bash
  docker ps
  ```

- **Stop the container:**
  ```bash
  docker stop obscura
  ```

- **Remove the container:**
  ```bash
  docker rm obscura
  ```

- **Remove the volume:**
  ```bash
  docker volume rm obscura_data
  ```

---

For more information, refer to the [Docker documentation](https://docs.docker.com/).

## 📦 Build from source

### Requirements
- Rust
- Cargo

### Steps

1. Clone the repository:

```sh
git clone https://github.com/soucosmo/obscura.git

cd obscura

cargo run
