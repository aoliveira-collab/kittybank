import { useId, type ReactNode } from 'react';
import { IconButton } from './controls';
import { ArrowRightIcon, SpinnerIcon } from './icons';
import { cx, useControllable, type BaseProps } from './shared';
export interface MessageProps extends BaseProps {
  author?: 'assistant' | 'customer';
  message?: string;
}
export function Message({ author = 'assistant', message, className }: MessageProps) {
  return (
    <div className={cx('kb-message', className)} data-author={author}>
      <small>{author === 'assistant' ? 'KittyBank' : 'Você'}</small>
      <p>
        {message ??
          (author === 'assistant'
            ? 'Olá! Em qual etapa posso ajudar?'
            : 'Preciso de ajuda com meu cadastro.')}
      </p>
    </div>
  );
}
export interface ComposerProps extends BaseProps {
  state?: 'empty' | 'ready' | 'sending';
  message?: string;
  defaultMessage?: string;
  onMessageChange?: (text: string) => void;
  onSend?: (text: string) => void;
  sendAction?: ReactNode;
  placeholder?: string;
}
export function Composer({
  state = 'empty',
  message,
  defaultMessage = '',
  onMessageChange,
  onSend,
  sendAction,
  placeholder = 'Escreva sua mensagem…',
  className,
}: ComposerProps) {
  const uid = useId();
  const [text, setText] = useControllable(message, defaultMessage, onMessageChange);
  const sending = state === 'sending';
  return (
    <form
      className={cx('kb-composer', className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (!sending && text.trim()) {
          onSend?.(text.trim());
          setText('');
        }
      }}
    >
      <label className="kb-sr-only" htmlFor={uid}>
        Mensagem
      </label>
      <input
        id={uid}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        disabled={sending}
      />
      {sendAction ?? (
        <IconButton
          type="submit"
          label={sending ? 'Enviando mensagem' : 'Enviar mensagem'}
          icon={
            sending ? (
              <span className="kb-spin">
                <SpinnerIcon />
              </span>
            ) : (
              <ArrowRightIcon />
            )
          }
          disabled={sending || !text.trim()}
        />
      )}
    </form>
  );
}
