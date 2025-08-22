import { Module } from '@nestjs/common';
import { AppLogger } from './logger.service';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from '@slyfox-platform/winston-config';

@Module({
   imports: [
    WinstonModule.forRoot(winstonConfig),
  ],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {}
