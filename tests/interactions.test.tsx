import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Button,
  TextField,
  SelectField,
  Checkbox,
  Switch,
  OTP,
  Balance,
  Composer,
  DocumentUpload,
  BottomBar,
  passwordChecks,
} from '../src';
describe('KittyBank — contratos de interação', () => {
  it('bloqueia cliques durante envio e quando desabilitado', async () => {
    const click = vi.fn(),
      user = userEvent.setup();
    render(
      <>
        <Button state="loading" onClick={click} />
        <Button state="disabled" label="Desabilitado" onClick={click} />
      </>,
    );
    await user.click(screen.getByText('Carregando…'));
    await user.click(screen.getByText('Desabilitado'));
    expect(click).not.toHaveBeenCalled();
    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-busy', 'true');
  });
  it('preserva a senha ao alternar visibilidade', async () => {
    const user = userEvent.setup();
    render(<TextField label="Senha" type="password" />);
    const input = screen.getByLabelText('Senha');
    await user.type(input, 'Kitty2026');
    await user.click(screen.getByRole('button', { name: 'Mostrar senha' }));
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue('Kitty2026');
    await user.click(screen.getByRole('button', { name: 'Ocultar senha' }));
    expect(input).toHaveAttribute('type', 'password');
  });
  it('seleciona com teclado e fecha com Escape', async () => {
    const user = userEvent.setup(),
      change = vi.fn();
    render(<SelectField onValueChange={change} />);
    await user.tab();
    await user.keyboard('{ArrowDown}{Enter}');
    expect(change).toHaveBeenCalledWith('CNH');
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  it('checkbox e switch respondem ao teclado', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Checkbox label="Aceito" />
        <Switch label="Notificações" />
      </>,
    );
    await user.tab();
    await user.keyboard(' ');
    expect(screen.getByRole('checkbox')).toBeChecked();
    await user.tab();
    await user.keyboard(' ');
    expect(screen.getByRole('switch')).toBeChecked();
  });
  it('cola OTP, move foco e notifica conclusão uma vez', async () => {
    const user = userEvent.setup(),
      complete = vi.fn();
    render(<OTP onComplete={complete} />);
    const first = screen.getByLabelText('Dígito 1 de 6');
    await user.click(first);
    await user.paste('12a3456');
    expect(screen.getByLabelText('Dígito 6 de 6')).toHaveValue('6');
    expect(screen.getByLabelText('Dígito 6 de 6')).toHaveFocus();
    expect(complete).toHaveBeenCalledExactlyOnceWith('123456');
  });
  it('remove o valor do DOM quando o saldo é ocultado', async () => {
    const user = userEvent.setup();
    render(<Balance amount="R$ 900,00" />);
    await user.click(screen.getByRole('button', { name: 'Ocultar saldo' }));
    expect(screen.queryByText('R$ 900,00')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Mostrar saldo' }));
    expect(screen.getByText('R$ 900,00')).toBeVisible();
  });
  it('envia somente mensagens não vazias e limpa o campo', async () => {
    const user = userEvent.setup(),
      send = vi.fn();
    render(<Composer onSend={send} />);
    expect(screen.getByRole('button')).toBeDisabled();
    await user.type(screen.getByLabelText('Mensagem'), 'Olá{Enter}');
    expect(send).toHaveBeenCalledExactlyOnceWith('Olá');
    expect(screen.getByLabelText('Mensagem')).toHaveValue('');
  });
  it('entrega o arquivo para o consumidor sem simular sucesso', async () => {
    const user = userEvent.setup(),
      upload = vi.fn();
    render(<DocumentUpload onFileSelect={upload} />);
    const file = new File(['demo'], 'documento.pdf', { type: 'application/pdf' });
    await user.upload(screen.getByLabelText('Selecionar documento'), file);
    expect(upload).toHaveBeenCalledExactlyOnceWith(file);
    expect(screen.queryByText('Documento recebido')).not.toBeInTheDocument();
  });
  it('emite destino de navegação sem forçar roteador', async () => {
    const user = userEvent.setup(),
      navigate = vi.fn();
    render(<BottomBar onNavigate={navigate} />);
    await user.click(screen.getByRole('button', { name: 'Cartões' }));
    expect(navigate).toHaveBeenCalledWith('cards');
  });
  it('avalia as regras de senha documentadas', () => {
    expect(passwordChecks('abc')).toEqual([false, false, false]);
    expect(passwordChecks('Kitty2026!')).toEqual([true, true, true]);
  });
});
