import { ValidateResponse } from '../types';

// Lê a URL base da variável de ambiente definida no .env
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Envia o arquivo CSV para o endpoint de validação
// Retorna os resultados com erros de cada produto (se houver)
export async function validateCsv(file: File): Promise<ValidateResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/api/products/validate`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao validar o arquivo');
  }

  return response.json();
}

// Envia o arquivo CSV para o endpoint de atualização
// Só deve ser chamado após validateCsv retornar valid: true
export async function updatePrices(file: File): Promise<{ message: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/api/products/update`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao atualizar os preços');
  }

  return response.json();
}
