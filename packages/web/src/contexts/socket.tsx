import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import io, { Socket } from 'socket.io-client';
import {
  SocketOptions,
  SocketStatus,
  SocketEventListener,
} from '@/types/socket';
import { MorphResult } from '@/types/morph';

export interface SocketContextValue {
  socketId?: string;
  status: SocketStatus;

  on(event: 'STARTED', fn: SocketEventListener<string>): void;

  on(
    event: 'FINISHED',
    fn: SocketEventListener<MorphResult>
  ): void;

  on(event: 'CANCELED', fn: SocketEventListener<string>): void;

  on(
    event: 'FAILED',
    fn: SocketEventListener<string>
  ): void;

  on(
    event: 'STATUS',
    fn: SocketEventListener<{ status: string; result: MorphResult }>
  ): void;

  on(event: string, fn: SocketEventListener): void;

  off(event: string, fn?: SocketEventListener): void;

  emit(event: 'GET_STATUS', payload: string): void;

  emit(event: 'START', payload: [file1: string, file2: string]): void;

  emit(event: 'CANCEL', payload: string): void;

  emit(event: string, ...args: any[]): void;

  disconnect(): void;
}

export const SocketContext = createContext<SocketContextValue>({
  status: SocketStatus.Disconnected,
  on() {},
  off() {},
  emit() {},
  disconnect() {},
});

const socketOptions: SocketOptions = {
  autoConnect: true,
  reconnection: true,
  transports: ['websocket'],
};

export interface SocketProviderProps {
  url?: string;
  options?: SocketOptions;
  children: ReactNode;
}

export function SocketProvider({
  url,
  options,
  children,
}: SocketProviderProps) {
  const [status, setStatus] = useState<SocketStatus>(SocketStatus.Disconnected);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const opts = { ...socketOptions, ...options };
    const sock = url ? io(url, opts) : io(opts);

    sock.on('connect', () => setStatus(SocketStatus.Connected));
    sock.on('reconnecting', () => setStatus(SocketStatus.Connecting));
    sock.on('connect_error', () => setStatus(SocketStatus.Error));
    sock.on('disconnect', () => setStatus(SocketStatus.Disconnected));

    setSocket(sock);

    return () => {
      sock.disconnect();
      setSocket(null);
    };
  }, [url, options]);

  const on = useCallback(
    (event: string, listener: SocketEventListener) => {
      if (!socket) return;
      socket.on(event, listener);
    },
    [socket]
  );

  const off = useCallback(
    (event: string, listener?: SocketEventListener) => {
      if (!socket) return;
      socket.off(event, listener);
    },
    [socket]
  );

  const emit = useCallback(
    (event: string, ...args: any[]) => {
      if (!socket) return;
      socket.emit(event, ...args);
    },
    [socket]
  );

  const disconnect = useCallback(() => {
    setSocket((prevSocket) => {
      if (prevSocket) prevSocket.disconnect();
      return null;
    });
  }, []);

  const value: SocketContextValue = useMemo(
    () => ({ socketId: socket?.id, status, on, off, emit, disconnect }),
    [socket?.id, status, on, off, emit, disconnect]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
