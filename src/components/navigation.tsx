import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { IconButton } from './controls';
import { BackIcon, CardIcon, CloseIcon, HelpIcon, HomeIcon, TransferIcon, UserIcon } from './icons';
import { cx, type BaseProps } from './shared';
export interface HeaderProps extends BaseProps {
  context?: 'onboarding' | 'account' | 'overlay';
  title?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onBack?: () => void;
  onClose?: () => void;
  onHelp?: () => void;
}
export function Header({
  context = 'onboarding',
  title = 'Abra sua conta',
  leading,
  trailing,
  onBack,
  onClose,
  onHelp,
  className,
}: HeaderProps) {
  return (
    <header className={cx('kb-header', className)}>
      {leading ?? (
        <IconButton
          icon={context === 'overlay' ? <CloseIcon /> : <BackIcon />}
          label={context === 'overlay' ? 'Fechar' : 'Voltar'}
          onClick={context === 'overlay' ? onClose : onBack}
        />
      )}
      <h1>{title}</h1>
      {context !== 'overlay' &&
        (trailing ?? <IconButton icon={<HelpIcon />} label="Ajuda" onClick={onHelp} />)}
    </header>
  );
}
export interface TabItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  state?: 'default' | 'selected';
  icon?: ReactNode;
}
export function TabItem({
  label = 'Início',
  state = 'default',
  icon = <HomeIcon />,
  className,
  ...rest
}: TabItemProps) {
  return (
    <button
      {...rest}
      type="button"
      className={cx('kb-tab', className)}
      data-state={state}
      aria-current={state === 'selected' ? 'page' : undefined}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
export type TabName = 'home' | 'cards' | 'activity' | 'profile';
export interface BottomBarProps extends BaseProps {
  active?: TabName;
  onNavigate?: (tab: TabName) => void;
  children?: ReactNode;
}
export function BottomBar({ active = 'home', onNavigate, children, className }: BottomBarProps) {
  const tabs = [
    ['home', 'Início', <HomeIcon />],
    ['cards', 'Cartões', <CardIcon />],
    ['activity', 'Extrato', <TransferIcon />],
    ['profile', 'Perfil', <UserIcon />],
  ] as const;
  return (
    <nav className={cx('kb-bottom-bar', className)} aria-label="Navegação principal">
      {children ??
        tabs.map(([key, label, icon]) => (
          <TabItem
            key={key}
            label={label}
            icon={icon}
            state={key === active ? 'selected' : 'default'}
            onClick={() => onNavigate?.(key)}
          />
        ))}
    </nav>
  );
}
