import { UseInterceptors } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';

import { RedisPropagatorInterceptor } from './modules/shared/redis-propagator/redis-propagator.interceptor';

@UseInterceptors(RedisPropagatorInterceptor)
@WebSocketGateway()
export class EventsGateway {}
