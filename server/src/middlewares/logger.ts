import bunyan from 'bunyan';

const log = bunyan.createLogger({
  name: 'JP-Server',
  streams: [
    {
      stream: process.stderr,
      level: 'debug',
    },
    {
      level: 'info',
      path: './src/logs/jp-server-info.log',
    },
    {
      level: 'error',
      path: './src/logs/jp-server-error.log',
    },
  ],
});

export { log };
