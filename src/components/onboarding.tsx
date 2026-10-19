import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from './controls';
import { CardIcon } from './icons';
import { cx, type BaseProps } from './shared';
export interface ChoiceCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  state?: 'default' | 'selected' | 'disabled';
  title?: string;
  description?: string;
  icon?: ReactNode;
}
export function ChoiceCard({
  state = 'default',
  title = 'Conta para você',
  description = 'Pix, cartão e seu dinheiro em um só lugar.',
  icon = <CardIcon />,
  className,
  disabled,
  ...rest
}: ChoiceCardProps) {
  return (
    <button
      {...rest}
      type="button"
      className={cx('kb-choice', className)}
      data-state={state}
      aria-pressed={state === 'selected'}
      disabled={disabled || state === 'disabled'}
    >
      {icon}
      <strong className="kb-heading-small">{title}</strong>
      <span className="kb-secondary">{description}</span>
      {state === 'selected' && <small>Selecionado</small>}
    </button>
  );
}
export interface StepProgressProps extends BaseProps {
  step?: '1' | '2' | '3';
  label?: string;
}
export function StepProgress({ step = '1', label, className }: StepProgressProps) {
  return (
    <div
      className={cx('kb-progress', className)}
      role="progressbar"
      aria-label={label ?? `Etapa ${step} de 3`}
      aria-valuenow={Number(step)}
      aria-valuemin={0}
      aria-valuemax={3}
    >
      <small>{label ?? `Etapa ${step} de 3`}</small>
      <div aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span key={n} data-complete={n <= Number(step)} />
        ))}
      </div>
    </div>
  );
}
export interface ActionFooterProps extends BaseProps {
  state?: 'incomplete' | 'ready' | 'submitting';
  step?: '1' | '2' | '3';
  label?: string;
  onContinue?: () => void;
  onSave?: () => void;
  progress?: ReactNode;
  action?: ReactNode;
}
export function ActionFooter({
  state = 'incomplete',
  step = '1',
  label = 'Continuar',
  onContinue,
  onSave,
  progress,
  action,
  className,
}: ActionFooterProps) {
  return (
    <footer className={cx('kb-action-footer', className)}>
      {progress ?? <StepProgress step={step} />}{' '}
      {action ?? (
        <Button
          label={label}
          state={
            state === 'incomplete' ? 'disabled' : state === 'submitting' ? 'loading' : 'default'
          }
          onClick={onContinue}
        />
      )}
      <Button hierarchy="ghost" label="Salvar e continuar depois" onClick={onSave} />
    </footer>
  );
}
