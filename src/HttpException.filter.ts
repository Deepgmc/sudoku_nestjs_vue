import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { resolve } from "path";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const status = exception.getStatus()

    // response
    //   .status(status)
    //   .json({
    //     FROM: 'NotFoundExceptionFilter',
    //     statusCode: status,
    //     path: request.url,
    //   });
    response.sendFile(resolve(__dirname, '../src/err.html'))
  }
}