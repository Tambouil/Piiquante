# Piiquante

REST API with CRUD opérations, JWT authentification, like / dislike post feature, Yup validation and Multer for handling files.

## Stack

Build with Node.js, Express and MongoDB.

## Security middlewares

- Yup password protection
- Rate Limit
- Helmet
- Express Mongo Sanitize

## Environment Variables

- Rename .env.example file to .env and set your MongoDB credentials. 
- Set JWT_TOKEN with your secret key (random string).

## Run the project

#### Clone and run the backend

```bash
git clone https://github.com/Tambouil/Piquante.git
```

```bash
pnpm install
```

```bash
pnpm run build
pnpm run start
```

#### Clone and run the frontend

```bash
git clone https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git
```

```bash
pnpm install
pnpm run start
```



