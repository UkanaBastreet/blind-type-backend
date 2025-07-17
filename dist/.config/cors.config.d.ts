import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
export declare function corsConfig(config: ConfigService): CorsOptions;
