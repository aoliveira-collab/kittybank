import { useId, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Button } from './controls';
import { CameraIcon, CheckIcon, LockIcon, SpinnerIcon, UploadIcon, WarningIcon } from './icons';
import { cx, useControllable, type BaseProps } from './shared';
export interface CodeCellProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'defaultValue'
> {
  digit?: string;
  state?: 'empty' | 'focus' | 'filled' | 'error';
}
export function CodeCell({ digit, state = 'empty', className, ...rest }: CodeCellProps) {
  return (
    <input
      {...rest}
      className={cx('kb-code-cell', className)}
      data-state={state}
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={1}
      aria-label={rest['aria-label'] ?? 'Dígito do código'}
      aria-invalid={state === 'error'}
      defaultValue={digit === '—' ? undefined : digit}
      placeholder="—"
    />
  );
}
export interface OTPProps extends BaseProps {
  label?: string;
  state?: 'empty' | 'filled' | 'error';
  value?: string;
  defaultValue?: string;
  onValueChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  onResend?: () => void;
  helper?: string;
  cells?: ReactNode;
  disabled?: boolean;
}
export function OTP({
  label = 'Código de segurança',
  state = 'empty',
  value,
  defaultValue = '',
  onValueChange,
  onComplete,
  onResend,
  helper,
  cells,
  disabled,
  className,
}: OTPProps) {
  const uid = useId();
  const [code, setCode] = useControllable(value, defaultValue, onValueChange);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const update = (index: number, text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 6 - index);
    const next = (
      code.padEnd(6, ' ').slice(0, index) +
      digits +
      code.padEnd(6, ' ').slice(index + digits.length)
    )
      .slice(0, 6)
      .trimEnd();
    setCode(next);
    if (digits) refs.current[Math.min(index + digits.length, 5)]?.focus();
    if (/^\d{6}$/.test(next)) onComplete?.(next);
  };
  return (
    <div className={cx('kb-otp', className)} role="group" aria-labelledby={uid}>
      <strong id={uid}>{label}</strong>
      <div className="kb-code-row">
        {cells ??
          Array.from({ length: 6 }, (_, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="kb-code-cell"
              data-state={state === 'error' ? 'error' : code[i] ? 'filled' : 'empty'}
              aria-label={`Dígito ${i + 1} de 6`}
              aria-invalid={state === 'error'}
              aria-describedby={`${uid}-helper`}
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={6}
              disabled={disabled}
              value={code[i]?.trim() ?? ''}
              placeholder="—"
              onFocus={(e) => e.currentTarget.select()}
              onChange={(e) => {
                if (e.target.value) update(i, e.target.value);
                else {
                  const next = code.padEnd(6, ' ').split('');
                  next[i] = ' ';
                  setCode(next.join('').trimEnd());
                }
              }}
              onPaste={(e) => {
                e.preventDefault();
                update(i, e.clipboardData.getData('text'));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !code[i]?.trim() && i > 0)
                  refs.current[i - 1]?.focus();
                if (e.key === 'ArrowLeft' && i > 0) {
                  e.preventDefault();
                  refs.current[i - 1]?.focus();
                }
                if (e.key === 'ArrowRight' && i < 5) {
                  e.preventDefault();
                  refs.current[i + 1]?.focus();
                }
              }}
            />
          ))}
      </div>
      <small id={`${uid}-helper`} className={state === 'error' ? 'kb-error' : 'kb-secondary'}>
        {helper ??
          (state === 'error'
            ? 'Código inválido. Confira e tente novamente.'
            : 'Digite os 6 dígitos enviados para seu celular.')}
      </small>
      <Button hierarchy="ghost" label="Reenviar código" disabled={disabled} onClick={onResend} />
    </div>
  );
}

export interface DocumentUploadProps extends BaseProps {
  state?: 'empty' | 'uploading' | 'success' | 'error';
  title?: string;
  description?: string;
  icon?: ReactNode;
  onFileSelect?: (file: File) => void;
  accept?: string;
  disabled?: boolean;
}
export function DocumentUpload({
  state = 'empty',
  title,
  description,
  icon,
  onFileSelect,
  accept = 'image/*,application/pdf',
  disabled,
  className,
}: DocumentUploadProps) {
  const uid = useId();
  const defaults = {
    empty: ['Envie seu documento', 'Frente legível, sem reflexos ou cortes.'],
    uploading: ['Enviando documento…', 'Aguarde a confirmação do envio.'],
    success: ['Documento recebido', 'Você já pode continuar.'],
    error: ['Não foi possível enviar', 'Confira a conexão e tente novamente.'],
  }[state];
  return (
    <div
      className={cx('kb-security-panel', className)}
      data-state={state}
      aria-busy={state === 'uploading'}
    >
      <span className={state === 'uploading' ? 'kb-spin' : undefined}>
        {icon ??
          {
            empty: <UploadIcon />,
            uploading: <SpinnerIcon />,
            success: <CheckIcon />,
            error: <WarningIcon />,
          }[state]}
      </span>
      <strong className="kb-heading-small">{title ?? defaults[0]}</strong>
      <span className="kb-secondary" aria-live="polite">
        {description ?? defaults[1]}
      </span>
      {onFileSelect && (
        <>
          <label className="kb-file-label" htmlFor={uid}>
            {state === 'error' ? 'Tentar novamente' : 'Selecionar documento'}
          </label>
          <input
            id={uid}
            className="kb-file-input"
            type="file"
            accept={accept}
            disabled={disabled || state === 'uploading'}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileSelect(file);
              e.target.value = '';
            }}
          />
        </>
      )}
    </div>
  );
}
export interface BiometricProps extends BaseProps {
  state?: 'ready' | 'scanning' | 'success' | 'error';
  title?: string;
  instructions?: string;
  icon?: ReactNode;
  onStart?: () => void;
  onAlternative?: () => void;
}
export function Biometric({
  state = 'ready',
  title,
  instructions,
  icon,
  onStart,
  onAlternative,
  className,
}: BiometricProps) {
  const defaults = {
    ready: ['Vamos confirmar que é você', 'Posicione o rosto no centro e siga as instruções.'],
    scanning: ['Verificando sua identidade', 'Posicione o rosto no centro e siga as instruções.'],
    success: ['Identidade confirmada', 'Posicione o rosto no centro e siga as instruções.'],
    error: ['Vamos tentar mais uma vez', 'Procure um local iluminado e retire acessórios.'],
  }[state];
  return (
    <div
      className={cx('kb-security-panel kb-biometric', className)}
      data-state={state}
      aria-busy={state === 'scanning'}
    >
      {icon ??
        (state === 'success' ? (
          <CheckIcon />
        ) : state === 'error' ? (
          <WarningIcon />
        ) : (
          <CameraIcon />
        ))}
      <strong className="kb-heading-small">{title ?? defaults[0]}</strong>
      <span className="kb-secondary" aria-live="polite">
        {instructions ?? defaults[1]}
      </span>
      {onStart && (
        <Button
          label={state === 'error' ? 'Tentar novamente' : 'Iniciar verificação'}
          state={state === 'scanning' ? 'loading' : 'default'}
          disabled={state === 'success'}
          onClick={onStart}
        />
      )}{' '}
      {onAlternative && (
        <Button hierarchy="ghost" label="Usar outra forma de verificação" onClick={onAlternative} />
      )}
    </div>
  );
}
export const passwordChecks = (password: string) => [
  password.length >= 8,
  /[A-Za-z]/.test(password) && /\d/.test(password),
  /[^A-Za-z0-9\s]/.test(password),
];
export interface PasswordRulesProps extends BaseProps {
  state?: 'pending' | 'valid';
  password?: string;
  icons?: ReactNode[];
  rules?: readonly string[];
}
export function PasswordRules({
  state = 'pending',
  password,
  icons,
  rules = ['Pelo menos 8 caracteres', 'Uma letra e um número', 'Um caractere especial'],
  className,
}: PasswordRulesProps) {
  const checks =
    password === undefined ? rules.map(() => state === 'valid') : passwordChecks(password);
  return (
    <div className={cx('kb-password-rules', className)} data-valid={checks.every(Boolean)}>
      <strong>Sua senha precisa ter:</strong>
      <ul>
        {rules.map((rule, i) => (
          <li key={rule}>
            {icons?.[i] ?? (checks[i] ? <CheckIcon /> : <LockIcon />)}
            <span>{rule}</span>
            <span className="kb-sr-only">{checks[i] ? ' — atendido' : ' — pendente'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
