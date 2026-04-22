import React from 'react';

interface StatusBadgeProps {
  errors: string[];
}

// Exibe um badge verde (OK) ou vermelho com as mensagens de erro
const StatusBadge: React.FC<StatusBadgeProps> = ({ errors }) => {
  if (errors.length === 0) {
    return <span className="badge badge--ok">✓ OK</span>;
  }

  return (
    <div className="badge-error-group">
      {errors.map((error, index) => (
        <span key={index} className="badge badge--error">
          ✕ {error}
        </span>
      ))}
    </div>
  );
};

export default StatusBadge;
