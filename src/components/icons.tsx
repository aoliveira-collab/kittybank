import type { CSSProperties } from 'react';
import { cx } from './shared';
export interface IconProps {
  className?: string;
  label?: string;
}
import ArrowRightAsset from '../assets/figma/f7450.svg';
import BackAsset from '../assets/figma/6ee56.svg';
import CloseAsset from '../assets/figma/0fd7e.svg';
import CheckAsset from '../assets/figma/de516.svg';
import ChevronDownAsset from '../assets/figma/d8615.svg';
import EyeAsset from '../assets/figma/3a5bf.svg';
import HomeAsset from '../assets/figma/53b88.svg';
import CardAsset from '../assets/figma/82356.svg';
import TransferAsset from '../assets/figma/d1987.svg';
import UserAsset from '../assets/figma/b1127.svg';
import HelpAsset from '../assets/figma/d6530.svg';
import LockAsset from '../assets/figma/9e24d.svg';
import DocumentAsset from '../assets/figma/8a18a.svg';
import CameraAsset from '../assets/figma/74dba.svg';
import UploadAsset from '../assets/figma/a1a83.svg';
import BellAsset from '../assets/figma/2b3b2.svg';
import SearchAsset from '../assets/figma/b4218.svg';
import PlusAsset from '../assets/figma/218df.svg';
import WarningAsset from '../assets/figma/fb2eb.svg';
import SpinnerAsset from '../assets/figma/298fd.svg';
function Glyph({ src, className, label }: { src: string } & IconProps) {
  return (
    <span
      className={cx('kb-icon', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ '--kb-icon-url': `url(${JSON.stringify(src)})` } as CSSProperties}
    />
  );
}
export function ArrowRightIcon(props: IconProps) {
  return <Glyph src={ArrowRightAsset} {...props} />;
}
export function BackIcon(props: IconProps) {
  return <Glyph src={BackAsset} {...props} />;
}
export function CloseIcon(props: IconProps) {
  return <Glyph src={CloseAsset} {...props} />;
}
export function CheckIcon(props: IconProps) {
  return <Glyph src={CheckAsset} {...props} />;
}
export function ChevronDownIcon(props: IconProps) {
  return <Glyph src={ChevronDownAsset} {...props} />;
}
export function EyeIcon(props: IconProps) {
  return <Glyph src={EyeAsset} {...props} />;
}
export function HomeIcon(props: IconProps) {
  return <Glyph src={HomeAsset} {...props} />;
}
export function CardIcon(props: IconProps) {
  return <Glyph src={CardAsset} {...props} />;
}
export function TransferIcon(props: IconProps) {
  return <Glyph src={TransferAsset} {...props} />;
}
export function UserIcon(props: IconProps) {
  return <Glyph src={UserAsset} {...props} />;
}
export function HelpIcon(props: IconProps) {
  return <Glyph src={HelpAsset} {...props} />;
}
export function LockIcon(props: IconProps) {
  return <Glyph src={LockAsset} {...props} />;
}
export function DocumentIcon(props: IconProps) {
  return <Glyph src={DocumentAsset} {...props} />;
}
export function CameraIcon(props: IconProps) {
  return <Glyph src={CameraAsset} {...props} />;
}
export function UploadIcon(props: IconProps) {
  return <Glyph src={UploadAsset} {...props} />;
}
export function BellIcon(props: IconProps) {
  return <Glyph src={BellAsset} {...props} />;
}
export function SearchIcon(props: IconProps) {
  return <Glyph src={SearchAsset} {...props} />;
}
export function PlusIcon(props: IconProps) {
  return <Glyph src={PlusAsset} {...props} />;
}
export function WarningIcon(props: IconProps) {
  return <Glyph src={WarningAsset} {...props} />;
}
export function SpinnerIcon(props: IconProps) {
  return <Glyph src={SpinnerAsset} {...props} />;
}
