import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Button } from './controls';
import { CheckIcon, DocumentIcon, HelpIcon, SpinnerIcon, TransferIcon, WarningIcon } from './icons';
import { cx, type BaseProps } from './shared';
export type FeedbackTone = 'success' | 'warning' | 'error' | 'info';
export interface BadgeProps extends BaseProps {
  tone?: FeedbackTone;
  label?: string;
}
export function Badge({ tone = 'success', label, className }: BadgeProps) {
  return (
    <span className={cx('kb-badge', className)} data-tone={tone}>
      {label ??
        { success: 'Concluído', warning: 'Pendente', error: 'Falhou', info: 'Em análise' }[tone]}
    </span>
  );
}
export interface AlertProps extends BaseProps {
  tone?: FeedbackTone;
  title?: string;
  description?: string;
  icon?: ReactNode;
}
export function Alert({ tone = 'success', title, description, icon, className }: AlertProps) {
  const defaults = {
    success: ['Tudo certo por aqui', 'Recebemos suas informações.'],
    warning: ['Revise antes de continuar', 'Confira os dados desta operação.'],
    error: ['Não conseguimos concluir', 'Seus dados foram preservados. Tente novamente.'],
    info: ['Seu pedido está em análise', 'Avisaremos quando houver uma atualização.'],
  }[tone];
  return (
    <div
      className={cx('kb-alert', className)}
      data-tone={tone}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      {icon ??
        (tone === 'success' ? <CheckIcon /> : tone === 'info' ? <HelpIcon /> : <WarningIcon />)}
      <div>
        <strong>{title ?? defaults[0]}</strong>
        <p>{description ?? defaults[1]}</p>
      </div>
    </div>
  );
}
export interface StateBlockProps extends BaseProps {
  state?: 'success' | 'empty' | 'error' | 'loading';
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  onAction?: () => void;
  actionLabel?: string;
}
export function StateBlock({
  state = 'success',
  title,
  description,
  icon,
  action,
  onAction,
  actionLabel,
  className,
}: StateBlockProps) {
  const copy = {
    success: [
      'Seu cadastro foi concluído',
      'Agora você pode acessar sua conta KittyBank.',
      'Ir para minha conta',
    ],
    empty: [
      'Ainda não há movimentações',
      'Quando você movimentar sua conta, tudo aparece aqui.',
      'Começar',
    ],
    error: [
      'Vamos tentar novamente?',
      'Confira sua conexão. Seus dados continuam salvos.',
      'Tentar novamente',
    ],
    loading: ['Estamos cuidando disso', 'Aguarde a confirmação para continuar.', ''],
  }[state];
  return (
    <section className={cx('kb-state-block', className)} aria-busy={state === 'loading'}>
      <span className={state === 'loading' ? 'kb-spin' : undefined}>
        {icon ??
          {
            success: <CheckIcon />,
            empty: <DocumentIcon />,
            error: <WarningIcon />,
            loading: <SpinnerIcon />,
          }[state]}
      </span>
      <h2 className="kb-heading-small">{title ?? copy[0]}</h2>
      <p className="kb-secondary" aria-live="polite">
        {description ?? copy[1]}
      </p>
      {state !== 'loading' &&
        (action ?? <Button label={actionLabel ?? copy[2]} onClick={onAction} />)}
    </section>
  );
}
export interface ConfirmationProps extends BaseProps {
  intent?: 'resumeLater' | 'confirmTransfer';
  title?: string;
  description?: string;
  icon?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  amount?: string;
  recipient?: string;
  open?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}
export function Confirmation({
  intent = 'resumeLater',
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  amount = 'R$ 250,00',
  recipient = 'Ana Oliveira',
  open,
  onConfirm,
  onClose,
  className,
}: ConfirmationProps) {
  const uid = useId(),
    dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open === undefined) return;
    const el = dialog.current;
    if (!el) return;
    const previous = document.activeElement as HTMLElement | null;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
    return () => {
      if (el.open) el.close();
      previous?.focus();
    };
  }, [open]);
  const content = (
    <>
      {icon ?? (intent === 'resumeLater' ? <DocumentIcon /> : <TransferIcon />)}
      <h2 id={`${uid}-title`} className="kb-heading-small">
        {title ?? (intent === 'resumeLater' ? 'Continuar depois?' : 'Confirmar transferência?')}
      </h2>
      <p id={`${uid}-description`} className="kb-secondary">
        {description ??
          (intent === 'resumeLater'
            ? 'Seu progresso será salvo. Você poderá retomar do mesmo ponto.'
            : `Envie ${amount} para ${recipient}. Confira os dados antes de confirmar.`)}
      </p>
      {primaryAction ?? (
        <Button
          label={intent === 'resumeLater' ? 'Salvar e sair' : 'Confirmar transferência'}
          onClick={onConfirm}
        />
      )}{' '}
      {secondaryAction ?? <Button hierarchy="secondary" label="Voltar" onClick={onClose} />}
    </>
  );
  return open === undefined ? (
    <section className={cx('kb-confirmation', className)} aria-labelledby={`${uid}-title`}>
      {content}
    </section>
  ) : (
    <dialog
      ref={dialog}
      className={cx('kb-confirmation', className)}
      aria-labelledby={`${uid}-title`}
      aria-describedby={`${uid}-description`}
      onKeyDown={(e) => {
        if (e.key !== 'Tab') return;
        const focusable = Array.from(
          e.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => el.getClientRects().length > 0);
        const first = focusable[0],
          last = focusable.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose?.();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose?.();
        }
      }}
    >
      {content}
    </dialog>
  );
}
