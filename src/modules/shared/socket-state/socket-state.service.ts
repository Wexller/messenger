import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketStateService {
  private socketState = new Map<string, Socket[]>();

  public add(conversationId: string, socket: Socket): boolean {
    const existingSockets = this.socketState.get(conversationId) || [];

    const sockets = [...existingSockets, socket];

    this.socketState.set(conversationId, sockets);

    return true;
  }

  public remove(conversationId: string, socket: Socket): boolean {
    const existingSockets = this.socketState.get(conversationId);

    if (!existingSockets) {
      return true;
    }

    const sockets = existingSockets.filter((s) => s.id !== socket.id);

    if (!sockets.length) {
      this.socketState.delete(conversationId);
    } else {
      this.socketState.set(conversationId, sockets);
    }

    return true;
  }

  public get(conversationId: string): Socket[] {
    return this.socketState.get(conversationId) || [];
  }

  public getAll(): Socket[] {
    const all = [];

    this.socketState.forEach((sockets) => all.push(sockets));

    return all;
  }
}
