# Reto Rimac Serverless API

## Descripción

Este proyecto utiliza Node.js con Serverless Framework para crear una API que integra datos de la API de Star Wars y los almacena en DynamoDB.

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/harenasr/D-Rimac-reto-rimac-serverless-api.git
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

## Uso

1. Para correr localmente usando Serverless Offline:
    ```bash
    npm start
    ```

2. Para desplegar en AWS:
    ```bash
    serverless deploy
    ```

## Endpoints

- **POST /people**: Guarda datos de personas en DynamoDB.
- **GET /people**: Recupera datos de personas desde DynamoDB.


