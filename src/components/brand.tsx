import { cx, type BaseProps } from './shared';
import primary from '../assets/figma/f6c6a.svg';
import coral from '../assets/figma/419fd.svg';
import markCoral from '../assets/figma/5dccc.svg';
import markCheck from '../assets/figma/23f55.svg';
import markWhite from '../assets/figma/1f378.svg';
export interface LogoProps extends BaseProps {
  tone?: 'primary' | 'white' | 'coral';
  label?: string;
}
export function Logo({ tone = 'primary', label = 'KittyBank', className }: LogoProps) {
  return (
    <span className={cx('kb-logo', className)} data-tone={tone} role="img" aria-label={label}>
      {tone === 'white' ? (
        <Mark tone="white" label="" />
      ) : (
        <img src={{ primary, coral }[tone]} alt="" width={48} height={48} />
      )}
      <span aria-hidden="true">kittybank</span>
    </span>
  );
}
export interface MarkProps extends BaseProps {
  tone?: 'coral' | 'white';
  label?: string;
}
export function Mark({ tone = 'coral', label = 'KittyBank', className }: MarkProps) {
  return (
    <span
      className={cx('kb-mark', className)}
      data-tone={tone}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={!label || undefined}
    >
      <img className="kb-mark-body" src={tone === 'white' ? markWhite : markCoral} alt="" />
      <img className="kb-mark-check" src={markCheck} alt="" />
    </span>
  );
}
