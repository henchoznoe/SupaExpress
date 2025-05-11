import { Application, Request, Response } from 'express';
import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';

/**
 * Setup logger middleware for the application.
 * This middleware logs HTTP requests and responses using Morgan and Winston.
 * @param {Application} app - The Express application instance.
 */
export const setupLogger = (app: Application) => {
  morgan.token('statusName', (_: Request, res: Response) => {
    return `${res.statusCode} - ${
      httpStatusDescriptions[res.statusCode] || 'Unknown Status'
    }`;
  });
  morgan.token('clientIp', (req: Request) => req.ip);
  app.use(
    morgan(':method :url [:statusName] :clientIp', {
      stream: {
        write: (message: string) => {
          const statusCode = parseInt(message.split('[')[1].split(' - ')[0]);
          log[statusCode < 400 ? 'info' : 'error'](message.trim());
        }
      }
    })
  );
};

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

/**
 * Create a logger instance using Winston.
 * The logger is configured to log messages in a specific format and level.
 * @returns {Logger} - The configured logger instance.
 */
export const log = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'DD.MM.YYYY HH:mm:ss'
    }),
    colorize(),
    customFormat
  ),
  transports: [new transports.Console()]
});

const httpStatusDescriptions: { [key: number]: string } = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  208: 'Already Reported',
  226: 'IM Used',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: "I'm a teapot",
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  425: 'Too Early',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required'
};
