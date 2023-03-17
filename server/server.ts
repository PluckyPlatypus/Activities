import app from './app';

const port = process.env.npm_package_config_port || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});