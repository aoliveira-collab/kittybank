import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { IconButton } from './controls';
import { CardIcon, EyeIcon, LockIcon, TransferIcon } from './icons';
import { cx, useControllable, type BaseProps } from './shared';
export interface BalanceProps extends BaseProps {
  state?: 'visible' | 'hidden' | 'loading';
  amount?: string;
  hidden?: boolean;
  onHiddenChange?: (hidden: boolean) => void;
  icon?: ReactNode;
}
export function Balance({
  state = 'visible',
  amount = 'R$ 5.634,12',
  hidden,
  onHiddenChange,
  icon = <EyeIcon />,
  className,
}: BalanceProps) {
  const [hide, setHide] = useControllable(hidden, state === 'hidden', onHiddenChange);
  return (
    <section
      className={cx('kb-balance', className)}
      aria-label="Saldo da conta"
      aria-busy={state === 'loading'}
    >
      <div className="kb-row">
        <span>Saldo disponível</span>
        <IconButton
          icon={icon}
          label={hide ? 'Mostrar saldo' : 'Ocultar saldo'}
          aria-pressed={hide}
          onClick={() => setHide(!hide)}
          disabled={state === 'loading'}
        />
      </div>
      <strong className="kb-amount" aria-live="polite">
        {state === 'loading' ? (
          'Carregando…'
        ) : hide ? (
          <span aria-label="Saldo oculto">••••••</span>
        ) : (
          amount
        )}
      </strong>
      <small>Conta KittyBank</small>
    </section>
  );
}
export interface PaymentCardProps extends BaseProps {
  state?: 'active' | 'frozen';
  holder?: string;
  lastDigits?: string;
  icon?: ReactNode;
}
export function PaymentCard({
  state = 'active',
  holder = 'ANA OLIVEIRA',
  lastDigits = '2048',
  icon,
  className,
}: PaymentCardProps) {
  return (
    <section
      className={cx('kb-payment-card', className)}
      data-state={state}
      aria-label={state === 'frozen' ? 'Cartão bloqueado' : 'Cartão virtual ativo'}
    >
      <div className="kb-row kb-card-brand">
        {icon ?? (state === 'frozen' ? <LockIcon /> : <CardIcon />)}
        <strong>kittybank</strong>
      </div>
      <strong className="kb-heading-small">•••• •••• •••• {lastDigits}</strong>
      <div className="kb-row">
        <small>{holder}</small>
        <small>{state === 'frozen' ? 'Bloqueado' : 'Virtual · Débito'}</small>
      </div>
    </section>
  );
}
export interface TransactionRowProps extends BaseProps {
  type?: 'incoming' | 'outgoing' | 'pending';
  title?: string;
  meta?: string;
  amount?: string;
  icon?: ReactNode;
  onClick?: () => void;
}
export function TransactionRow({
  type = 'incoming',
  title,
  meta = 'Hoje · 14:32',
  amount,
  icon = <TransferIcon />,
  onClick,
  className,
}: TransactionRowProps) {
  const content = (
    <>
      {icon}
      <span className="kb-transaction-description">
        <strong>{title ?? (type === 'incoming' ? 'Pix recebido' : 'Pix enviado')}</strong>
        <small>{meta}</small>
      </span>
      <span className="kb-transaction-amount">
        <strong>{amount ?? (type === 'incoming' ? '+ R$ 250,00' : '− R$ 48,90')}</strong>
        {type === 'pending' && <small>Processando</small>}
      </span>
    </>
  );
  const props = { className: cx('kb-transaction', className), 'data-type': type };
  return onClick ? (
    <button {...props} type="button" onClick={onClick}>
      {content}
    </button>
  ) : (
    <div {...props}>{content}</div>
  );
}
export interface QuickActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: ReactNode;
  state?: 'default' | 'pressed' | 'disabled';
}
export function QuickAction({
  label = 'Transferir',
  icon = <TransferIcon />,
  state = 'default',
  disabled,
  className,
  ...rest
}: QuickActionProps) {
  return (
    <button
      {...rest}
      type="button"
      className={cx('kb-quick-action', className)}
      data-state={state}
      disabled={disabled || state === 'disabled'}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
export interface SummaryRowProps extends BaseProps {
  emphasis?: 'default' | 'total';
  label?: string;
  value?: string;
}
export function SummaryRow({
  emphasis = 'default',
  label = 'Destinatário',
  value = 'Ana Oliveira',
  className,
}: SummaryRowProps) {
  return (
    <div className={cx('kb-summary', className)} data-emphasis={emphasis}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
