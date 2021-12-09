import * as Sentry from "@sentry/node";
import dotenv from "dotenv";
import winston from "winston";
dotenv.config();

const config = {
  colors: {
    error: "red",
    debug: "blue",
    warn: "yellow",
    data: "grey",
    info: "green",
    verbose: "cyan",
    silly: "magenta",
    custom: "yellow",
  },
};

winston.addColors(config.colors);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.colorize(),
    winston.format.json(),
    winston.format.splat(),
    winston.format.errors({ stack: true })
  ),
  // defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "info.log", level: "info" }),
    // new winston.transports.Console(),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.colorize()
      ),
    })
  );
}

export class Logger {
  
  private fileName: string;
  private filePath: string;
  constructor(fileName: string, filePath: string) {
    this.fileName = fileName;
    this.filePath = filePath;
  }

  public info(message: string | number | any): void {
    logger.info(JSON.stringify(message), {
      fileName: this.fileName,
      filePath: this.filePath,
    });
    this.logToSentry(message);
  }

  public error(message: string | number | any): void {
    logger.error(JSON.stringify(message), {
      fileName: this.fileName,
      filePath: this.filePath,
    });
    this.logToSentry(message);
  }

  public warn(message: string | number | any): void {
    logger.warn(JSON.stringify(message), {
      fileName: this.fileName,
      filePath: this.filePath,
    });
    this.logToSentry(message);
  }

  public log(message: string | number | any): void {
    logger.log("error", JSON.stringify(message), {
      fileName: this.fileName,
      filePath: this.filePath,
    });
    this.logToSentry(message);
  }

  private logToSentry(message: string | any) {
    if (process.env.NODE_ENV === "production") {
      Sentry.captureMessage(JSON.stringify(message));
    }
  }
}
