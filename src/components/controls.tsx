import {
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  EyeIcon,
  HelpIcon,
  SpinnerIcon,
} from './icons';
import { cx, useControllable, type BaseProps } from './shared';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hierarchy?: 'primary' | 'secondary' | 'ghost';
  state?: 'default' | 'pressed' | 'focus' | 'disabled' | 'loading';
  label?: string;
  icon?: ReactNode;
  showIcon?: boolean;
  loadingIcon?: ReactNode;
}
export function Button({
  hierarchy = 'primary',
  state = 'default',
  label = 'Continuar',
  icon = <ArrowRightIcon />,
  showIcon = false,
  loadingIcon = <SpinnerIcon />,
  disabled,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={cx('kb-button', className)}
      data-hierarchy={hierarchy}
      data-state={state}
      disabled={disabled || state === 'disabled' || state === 'loading'}
      aria-busy={state === 'loading' || undefined}
    >
      {state === 'loading' ? (
        <>
          <span className="kb-spin">{loadingIcon}</span>
          <span>Carregando…</span>
        </>
      ) : (
        <>
          {showIcon && icon}
          <span>{children ?? label}</span>
        </>
      )}
    </button>
  );
}
export interface IconButtonProps extends Omit<ButtonProps, 'hierarchy' | 'showIcon' | 'state'> {
  state?: 'default' | 'pressed' | 'focus' | 'disabled';
  label?: string;
}
export function IconButton({
  icon = <HelpIcon />,
  label = 'Ajuda',
  state = 'default',
  className,
  disabled,
  type = 'button',
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={cx('kb-icon-button', className)}
      data-state={state}
      disabled={disabled || state === 'disabled'}
      aria-label={rest['aria-label'] ?? label}
    >
      {children ?? icon}
    </button>
  );
}

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue'
> {
  label?: string;
  value?: string;
  defaultValue?: string;
  helper?: string;
  showHelper?: boolean;
  type?: 'text' | 'password';
  state?: 'empty' | 'filled' | 'focus' | 'error' | 'disabled';
  visibilityIcon?: ReactNode;
}
export function TextField({
  label = 'Nome completo',
  helper,
  showHelper = true,
  type = 'text',
  state = 'empty',
  value,
  defaultValue,
  visibilityIcon = <EyeIcon />,
  className,
  id,
  disabled,
  ...rest
}: TextFieldProps) {
  const uid = useId();
  const inputId = id ?? uid;
  const [visible, setVisible] = useState(false);
  const helperText =
    helper ??
    (state === 'error'
      ? 'Revise este campo para continuar.'
      : type === 'password'
        ? 'Use uma senha exclusiva para sua conta.'
        : 'Como aparece no seu documento.');
  return (
    <div className={cx('kb-field', className)} data-state={state}>
      <label htmlFor={inputId}>{label}</label>
      <div className="kb-input-wrap">
        <input
          {...rest}
          id={inputId}
          type={type === 'password' && !visible ? 'password' : 'text'}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled || state === 'disabled'}
          aria-invalid={state === 'error' || rest['aria-invalid']}
          aria-describedby={
            showHelper && helperText ? `${inputId}-helper` : rest['aria-describedby']
          }
          placeholder={rest.placeholder ?? 'Digite aqui'}
        />
        {type === 'password' && (
          <IconButton
            className="kb-field-eye"
            icon={visibilityIcon}
            label={visible ? 'Ocultar senha' : 'Mostrar senha'}
            aria-pressed={visible}
            disabled={disabled || state === 'disabled'}
            onClick={() => setVisible(!visible)}
          />
        )}
      </div>
      {showHelper && helperText && (
        <small id={`${inputId}-helper`} className="kb-helper">
          {helperText}
        </small>
      )}
    </div>
  );
}

export interface SelectFieldProps extends BaseProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  state?: 'empty' | 'filled' | 'open' | 'error' | 'disabled';
  placeholder?: string;
  helper?: string;
  options?: readonly { label: string; value: string }[];
  onValueChange?: (value: string) => void;
  icon?: ReactNode;
  name?: string;
  required?: boolean;
}
export function SelectField({
  label = 'Tipo de documento',
  value,
  defaultValue = '',
  state = 'empty',
  placeholder = 'Selecione uma opção',
  helper,
  options = [
    { label: 'RG', value: 'RG' },
    { label: 'CNH', value: 'CNH' },
    { label: 'Passaporte', value: 'Passaporte' },
  ],
  onValueChange,
  icon = <ChevronDownIcon />,
  className,
  id,
  name,
  required,
}: SelectFieldProps) {
  const uid = useId(),
    listId = `${id ?? uid}-list`;
  const [selected, setSelected] = useControllable(value, defaultValue, onValueChange);
  const [open, setOpen] = useState(state === 'open');
  const [active, setActive] = useState(
    Math.max(
      0,
      options.findIndex((o) => o.value === selected),
    ),
  );
  const trigger = useRef<HTMLButtonElement>(null);
  const choose = (v: string) => {
    setSelected(v);
    setOpen(false);
    trigger.current?.focus();
  };
  return (
    <div
      className={cx('kb-field kb-select', className)}
      data-state={state}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <label id={`${listId}-label`} htmlFor={id ?? uid}>
        {label}
      </label>
      <button
        ref={trigger}
        type="button"
        id={id ?? uid}
        className="kb-select-trigger"
        role="combobox"
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={`${listId}-label`}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={state === 'error'}
        aria-required={required}
        disabled={state === 'disabled'}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setOpen(false);
            e.preventDefault();
          }
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            setOpen(true);
            setActive((i) =>
              Math.max(0, Math.min(options.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1))),
            );
          }
          if (e.key === 'Home') {
            e.preventDefault();
            setActive(0);
          }
          if (e.key === 'End') {
            e.preventDefault();
            setActive(options.length - 1);
          }
          if (open && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            if (options[active]) choose(options[active].value);
          }
        }}
      >
        <span>{options.find((o) => o.value === selected)?.label || selected || placeholder}</span>
        {icon}
      </button>
      {name && <input type="hidden" name={name} value={selected} />}{' '}
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={`${listId}-label`}
          className="kb-select-options"
        >
          {options.map((o, i) => (
            <li
              id={`${listId}-${i}`}
              key={o.value}
              role="option"
              aria-selected={o.value === selected}
              data-active={i === active}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(o.value)}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
      {helper && <small className="kb-helper">{helper}</small>}
    </div>
  );
}

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  label?: string;
  state?: 'unchecked' | 'checked' | 'error' | 'disabled';
  onCheckedChange?: (checked: boolean) => void;
  icon?: ReactNode;
}
export function Checkbox({
  label = 'Li e aceito os termos de uso',
  state = 'unchecked',
  checked,
  defaultChecked,
  disabled,
  onCheckedChange,
  icon = <CheckIcon />,
  className,
  ...rest
}: CheckboxProps) {
  const [isChecked, setChecked] = useControllable(
    checked,
    defaultChecked ?? state === 'checked',
    onCheckedChange,
  );
  return (
    <label className={cx('kb-checkbox', className)} data-state={state}>
      <input
        {...rest}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setChecked(e.target.checked)}
        disabled={disabled || state === 'disabled'}
        aria-invalid={state === 'error'}
      />
      <span className="kb-checkbox-box" aria-hidden="true">
        {isChecked && icon}
      </span>
      <span>{label}</span>
    </label>
  );
}
export interface SwitchProps extends Omit<CheckboxProps, 'state' | 'icon'> {
  state?: 'off' | 'on' | 'disabled';
}
export function Switch({
  state = 'off',
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  label = 'Ativar opção',
  className,
  ...rest
}: SwitchProps) {
  const [on, setOn] = useControllable(checked, defaultChecked ?? state === 'on', onCheckedChange);
  return (
    <label className={cx('kb-switch', className)}>
      <input
        {...rest}
        type="checkbox"
        role="switch"
        aria-label={label}
        checked={on}
        disabled={disabled || state === 'disabled'}
        onChange={(e) => setOn(e.target.checked)}
      />
      <span className="kb-switch-track" aria-hidden="true">
        <span />
      </span>
    </label>
  );
}
