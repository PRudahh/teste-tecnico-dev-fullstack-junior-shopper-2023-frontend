import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ResultsTable from './components/ResultsTable';
import { validateCsv, updatePrices } from './services/api';
import { ValidationResult, AppState } from './types';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [appState, setAppState] = useState<AppState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Determina se todos os produtos passaram na validação
  const allValid =
    results.length > 0 && results.every((r) => r.errors.length === 0);

  function handleFileSelect(selectedFile: File) {
    // Ao selecionar novo arquivo, limpa resultados anteriores
    setFile(selectedFile);
    setResults([]);
    setAppState('idle');
    setErrorMessage('');
    setSuccessMessage('');
  }

  async function handleValidate() {
    if (!file) return;

    setAppState('validating');
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await validateCsv(file);
      setResults(response.results);
      setAppState('validated');
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao conectar com a API');
      setAppState('error');
    }
  }

  async function handleUpdate() {
    if (!file || !allValid) return;

    setAppState('updating');
    setErrorMessage('');

    try {
      const response = await updatePrices(file);
      setSuccessMessage(response.message);
      setAppState('success');
      // Limpa tudo após sucesso para aceitar novo arquivo
      setFile(null);
      setResults([]);
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao atualizar os preços');
      setAppState('error');
    }
  }

  const isValidating = appState === 'validating';
  const isUpdating = appState === 'updating';
  const isBusy = isValidating || isUpdating;

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__logo">S</div>
          <div>
            <h1 className="app-header__title">Shopper</h1>
            <p className="app-header__subtitle">Atualização Massiva de Preços</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="card">
          <h2 className="card__title">Carregar arquivo de precificação</h2>
          <p className="card__description">
            Selecione o arquivo CSV gerado pelo time de Compras. O sistema irá
            validar todas as regras antes de permitir a atualização.
          </p>

          <FileUpload
            onFileSelect={handleFileSelect}
            selectedFile={file}
            disabled={isBusy}
          />

          <div className="action-row">
            <button
              className="btn btn--primary"
              onClick={handleValidate}
              disabled={!file || isBusy}
            >
              {isValidating ? (
                <><span className="spinner" /> Validando...</>
              ) : (
                'VALIDAR'
              )}
            </button>

            <button
              className="btn btn--success"
              onClick={handleUpdate}
              disabled={!allValid || isBusy}
              title={
                !allValid && results.length > 0
                  ? 'Corrija os erros antes de atualizar'
                  : ''
              }
            >
              {isUpdating ? (
                <><span className="spinner" /> Atualizando...</>
              ) : (
                'ATUALIZAR'
              )}
            </button>
          </div>

          {/* Mensagem de erro global (ex: API fora do ar) */}
          {errorMessage && (
            <div className="message message--error">
              <strong>Erro:</strong> {errorMessage}
            </div>
          )}

          {/* Mensagem de sucesso após atualização */}
          {successMessage && (
            <div className="message message--success">
              <strong>✓</strong> {successMessage}
            </div>
          )}
        </section>

        {/* Tabela de resultados — só aparece após validação */}
        {results.length > 0 && (
          <section className="card card--results">
            <div className="results-header">
              <h2 className="card__title">Resultado da Validação</h2>
              <span className={`summary-badge ${allValid ? 'summary-badge--ok' : 'summary-badge--error'}`}>
                {allValid
                  ? `✓ ${results.length} produto(s) prontos para atualização`
                  : `✕ ${results.filter((r) => r.errors.length > 0).length} produto(s) com erro`}
              </span>
            </div>
            <ResultsTable results={results} />
          </section>
        )}
      </main>

      <footer className="app-footer">
        Shopper — Ferramenta interna de precificação
      </footer>
    </div>
  );
}

export default App;