import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
export declare function sessionConfig(config: ConfigService): session.SessionOptions;
