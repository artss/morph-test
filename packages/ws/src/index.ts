import process from 'process';
import os from 'os';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { MorphObject, MorphResult, MorphStatus } from './types';
import { DEFAULT_PORT, MAX_BUFFER_SIZE, RESULT_TTL } from './constants';
import { Morph } from './morph';

const PORT = Number(process.env.PORT || DEFAULT_PORT);
if (!PORT || Number.isNaN(PORT)) {
  console.error('Invalid or undefined port', process.env.PORT);
  process.exit(1);
}

const morphObjects: Record<string, MorphObject> = {};

function emit(morphId: string, event: string, payload?: any) {
  morphObjects[morphId]?.sockets.forEach((socket) =>
    socket.emit(event, payload)
  );
}

(async () => {
  const httpServer = createServer();

  const ioServer = new Server(httpServer, {
    maxHttpBufferSize: MAX_BUFFER_SIZE,
  });
  httpServer.listen(PORT, () =>
    console.info('Socket.io', os.hostname(), 'listening on', PORT)
  );

  ioServer.on('connection', (socket: Socket) => {
    let morphId: string | undefined;

    socket.on('START', (images: string[]) => {
      const onResult = (result: MorphResult) => {
        if (!morphId) return;
        const obj = morphObjects[morphId];
        if (!obj) return;

        obj.status = MorphStatus.Finished;
        obj.result = result;

        emit(morphId, 'FINISHED', result);

        setTimeout(() => {
          if (!morphId) return;
          delete morphObjects[morphId];
        }, RESULT_TTL);
      };

      const onError = (error: string) => {
        if (!morphId) return;
        const obj = morphObjects[morphId];
        if (!obj) return;

        obj.status = MorphStatus.Failed;
        obj.error = error;

        emit(morphId, 'FAILED', error);

        setTimeout(() => {
          if (!morphId) return;
          delete morphObjects[morphId];
        }, RESULT_TTL);
      };

      const morph = new Morph(images, onResult, onError);
      morphId = morph.id;

      morphObjects[morphId] = {
        sockets: [socket],
        status: MorphStatus.Started,
        morph,
      };

      emit(morphId, 'STARTED', morphId);
    });

    socket.on('CANCEL', (id: string) => {
      if (!id || !morphObjects[id]) return;
      morphObjects[id].morph.cancel();
      morphObjects[id].status = MorphStatus.Canceled;

      emit(id, 'CANCELED', id);
    });

    socket.on('GET_STATUS', (id: string) => {
      if (!id || !morphObjects[id]) {
        socket.emit('STATUS', { status: MorphStatus.NotFound });
        return;
      }

      const { status, result } = morphObjects[id];
      socket.emit('STATUS', { status, result });
    });

    socket.on('disconnect', () => {
      if (!morphId) return;
      morphObjects[morphId].sockets = morphObjects[morphId].sockets.filter(
        (sock) => sock !== socket
      );
    });
  });
})();
