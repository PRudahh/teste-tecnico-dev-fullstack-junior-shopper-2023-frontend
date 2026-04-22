import React from 'react';
import { ValidationResult } from '../types';
import StatusBadge from './StatusBadge';

interface ResultsTableProps {
  results: ValidationResult[];
}

// Formata número como moeda brasileira: 9.5 → R$ 9,50
function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

// Tabela com os produtos validados, seus preços e status de validação
const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  return (
    <div className="table-wrapper">
      <table className="results-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome do Produto</th>
            <th>Preço Atual</th>
            <th>Novo Preço</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => (
            <tr
              key={item.code}
              className={item.errors.length > 0 ? 'row--error' : 'row--ok'}
            >
              <td className="cell--code">{item.code}</td>
              <td className="cell--name">{item.name || '—'}</td>
              <td className="cell--price">{formatCurrency(item.current_price)}</td>
              <td className="cell--price">{formatCurrency(item.new_price)}</td>
              <td className="cell--status">
                <StatusBadge errors={item.errors} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
