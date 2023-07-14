import {
  ManagerOptions,
  SocketOptions as SocketIoOptions,
} from 'socket.io-client';

export enum SocketStatus {
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  Connected = 'connected',
  Error = 'error',
}

export type SocketOptions = Partial<ManagerOptions & SocketIoOptions>;

export type SocketEventListener<T = any> = (payload: T) => void;
