import { StrictMode, useState, createElement, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import * as KB from '../src';
import manifest from '../code-connect/manifest.json';
import './styles.css';

function combinations(variants: Record<string, readonly string[]>): Record<string, string>[] {
  return Object.entries(variants).reduce<Record<string, string>[]>(
    (rows, [key, values]) =>
      rows.flatMap((row) =>
        values.map((value) => ({ ...row, [key]: value[0].toLowerCase() + value.slice(1) })),
      ),
    [{}],
  );
}
function Playground() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [code, setCode] = useState('');
  const [tab, setTab] = useState<KB.TabName>('home');
  const [password, setPassword] = useState('');
  return (
    <section className="catalog-lab" id="playground">
      <div>
        <span className="eyebrow">TESTE OS CONTROLES</span>
        <h2>Componentes que respondem.</h2>
        <p>
          Use Tab, setas, Enter e Escape. Os exemplos são locais e não realizam operações bancárias.
        </p>
      </div>
      <div className="catalog-grid">
        <article className="specimen">
          <KB.TextField
            type="password"
            label="Senha de exemplo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helper="Use somente dados fictícios."
          />
          <KB.PasswordRules password={password} />
          <KB.SelectField />
          <KB.Checkbox />
          <KB.Switch label="Receber notificações" />
        </article>
        <article className="specimen">
          <KB.OTP
            value={code}
            onValueChange={setCode}
            onComplete={() => setStatus('Código completo.')}
            onResend={() => {
              setCode('');
              setStatus('Novo código solicitado no exemplo.');
            }}
          />
          <KB.Composer onSend={(text) => setStatus(`Mensagem local: ${text}`)} />
          <p role="status">{status}</p>
        </article>
        <article className="specimen">
          <KB.Balance />
          <KB.Button label="Abrir confirmação" onClick={() => setOpen(true)} />
          <KB.BottomBar active={tab} onNavigate={setTab} />
          <p>Área selecionada: {tab}</p>
        </article>
      </div>
      <KB.Confirmation
        open={open}
        intent="confirmTransfer"
        amount="R$ 150,00"
        recipient="Lucas Santos"
        onClose={() => setOpen(false)}
        onConfirm={() => {
          setStatus('Confirmação demonstrativa concluída.');
          setOpen(false);
        }}
      />
    </section>
  );
}
function Catalog() {
  const [filter, setFilter] = useState('');
  return (
    <main className="kb-theme catalog">
      <header className="catalog-hero">
        <KB.Logo />
        <div>
          <span className="eyebrow">DESIGN SYSTEM · REACT</span>
          <h1>
            Seu dinheiro,
            <br />
            em boas patas.
          </h1>
          <p>
            30 famílias, 113 variantes e 20 ícones.
            <br />
            Uma biblioteca conectada ao Figma.
          </p>
        </div>
        <a href="#playground">Experimentar componentes ↓</a>
      </header>
      <Playground />
      <section className="catalog-library">
        <div className="catalog-toolbar">
          <h2>Biblioteca de componentes</h2>
          <label>
            Buscar componente
            <input
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Button, saldo, ícones…"
            />
          </label>
        </div>
        {manifest
          .filter((item) =>
            (item.component + ' ' + item.figmaName).toLowerCase().includes(filter.toLowerCase()),
          )
          .map((item) => {
            const Component = KB[item.component as keyof typeof KB] as ComponentType<
              Record<string, unknown>
            >;
            return (
              <section key={item.component} className="component-section" id={item.component}>
                <div className="component-title">
                  <h3>{item.component}</h3>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    Ver no Figma ↗
                  </a>
                </div>
                <p className="component-path">{item.figmaName}</p>
                <div className="catalog-grid">
                  {combinations(item.variants as Record<string, string[]>).map((props, i) => {
                    const sample: Record<string, unknown> = { ...props };
                    if (item.component === 'TextField' && props.state !== 'empty')
                      sample.defaultValue =
                        props.type === 'password' ? 'Kitty2026' : 'Ana Oliveira';
                    if (item.component === 'SelectField' && props.state !== 'empty')
                      sample.defaultValue = 'RG';
                    if (item.component === 'OTP' && props.state !== 'empty')
                      sample.defaultValue = '123456';
                    if (item.component === 'CodeCell' && props.state === 'filled')
                      sample.digit = '1';
                    if (item.component === 'Composer' && props.state !== 'empty')
                      sample.defaultMessage = 'Preciso de ajuda com meu cadastro.';
                    return (
                      <article
                        className="specimen"
                        data-component={item.component}
                        data-variant={i}
                        key={JSON.stringify(props)}
                      >
                        <code>
                          {Object.entries(props)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(' · ') || 'default'}
                        </code>
                        <div
                          className={
                            'specimen-preview ' + (props.tone === 'white' ? 'specimen-dark' : '')
                          }
                        >
                          {createElement(Component, sample)}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
      </section>
      <footer className="catalog-footer">
        <KB.Mark />
        KittyBank · Biblioteca local · Coloring 1.1
      </footer>
    </main>
  );
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Catalog />
  </StrictMode>,
);
