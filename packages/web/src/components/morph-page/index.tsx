import { useEffect, useMemo, useRef, useState } from 'react';
import { SocketStatus } from '@/types/socket';
import { useSocket } from '@/contexts/socket';
import { MorphForm } from '@/components/morph-form';
import { uniqid } from '@/utils/uniqid';
import { MorphResult, MorphStatus } from '@/types/morph';
import { OnStatusPayload } from './types';
import { ResultImages } from './result';
import { ErrorText, StatusLabel } from './index.styled';

const getId = () => sessionStorage.getItem('morphId');
const setId = (id: string) => sessionStorage.setItem('morphId', id);
const removeId = () => sessionStorage.removeItem('morphId');

export function MorphPage() {
  const { socketId, on, off, emit, status: socketStatus } = useSocket();

  const [formKey, setFormKey] = useState(uniqid);

  const storedMorphId = useMemo<string | null>(getId, []);
  const morphId = useRef(storedMorphId);

  const [morphStatus, setMorphStatus] = useState<MorphStatus | undefined>();
  const [morphResult, setMorphResult] = useState<MorphResult | undefined>();
  const [morphError, setMorphError] = useState<string | undefined>();

  const setMorphId = (id: string) => {
    morphId.current = id;
    setId(id);
  };

  const removeMorphId = () => {
    morphId.current = null;
    removeId();
  };

  const onSubmit = (images: string[]) => {
    emit('START', images);
    removeMorphId();
    setMorphStatus(MorphStatus.Pending);
  };

  const onCancel = () => {
    if (!morphId.current) return;
    emit('CANCEL', morphId.current);
  };

  const onReset = () => {
    removeMorphId();
    setFormKey(uniqid());
    setMorphStatus(undefined);
    setMorphResult(undefined);
    setMorphError(undefined);
  };

  useEffect(() => {
    on('STARTED', (payload) => {
      setMorphId(payload);
      setMorphStatus(MorphStatus.Started);
      setMorphError(undefined);
    });

    on('CANCELED', (payload) => {
      if (morphId.current !== payload) return;
      setMorphStatus(MorphStatus.Canceled);
      removeMorphId();
    });

    on('FAILED', (error: string) => {
      setMorphStatus(MorphStatus.Failed);
      setMorphError(error);
      setMorphResult(undefined);
    });

    on('FINISHED', (result: MorphResult) => {
      setMorphStatus(MorphStatus.Finished);
      setMorphResult(result);
      setMorphError(undefined);
    });

    on('STATUS', ({ status, result }: OnStatusPayload) => {
      if (status === MorphStatus.NotFound) {
        onReset();
        return;
      }

      setMorphStatus(status);
      setMorphResult(result);
    });

    if (morphId.current) {
      emit('GET_STATUS', morphId.current);
    }
  }, [socketId, on, off, emit]);

  const isConnected = socketStatus === SocketStatus.Connected;

  const isRunning =
    morphStatus === MorphStatus.Pending || morphStatus === MorphStatus.Started;

  const showReset = !!morphStatus && !isRunning;

  return (
    <>
      <MorphForm
        key={formKey}
        images={2}
        disabled={!isConnected || isRunning}
        onSubmit={onSubmit}
        showCancel={isRunning}
        onCancel={onCancel}
        showReset={showReset}
        onReset={onReset}
      />

      {morphStatus && <StatusLabel>Morph process is {morphStatus}</StatusLabel>}

      {morphError && <ErrorText>{morphError}</ErrorText>}

      {morphResult?.result && (
        <ResultImages title="Result" images={morphResult.result} />
      )}

      {morphResult?.other && (
        <ResultImages title="Other" images={morphResult.other} />
      )}
    </>
  );
}
