# DKSH Lunch

## Development Stage
```bash
# Requirements
- Node.js v20
- Chrome

npm install
npm start
```

## Production Stage
```bash
# Requirements
- Docker or Docker Desktop

docker build -t dksh-lunch .
docker run -d -p 5000:5000 dksh-lunch
```