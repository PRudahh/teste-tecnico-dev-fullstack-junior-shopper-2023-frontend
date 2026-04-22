import React, { useRef } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  disabled: boolean;
}

// Área de upload com suporte a clique e drag-and-drop
const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (!disabled) inputRef.current?.click();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <div
      className={`upload-area ${selectedFile ? 'upload-area--selected' : ''} ${disabled ? 'upload-area--disabled' : ''}`}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      {selectedFile ? (
        <div className="upload-area__file-info">
          <span className="upload-area__icon">📄</span>
          <span className="upload-area__filename">{selectedFile.name}</span>
          <span className="upload-area__hint">Clique para trocar o arquivo</span>
        </div>
      ) : (
        <div className="upload-area__placeholder">
          <span className="upload-area__icon">⬆</span>
          <span className="upload-area__label">Selecione ou arraste um arquivo CSV</span>
          <span className="upload-area__hint">Apenas arquivos .csv são aceitos</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
