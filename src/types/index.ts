// Representa um produto retornado pela API após validação
export interface ValidationResult {
  code: number;
  name: string;
  current_price: number;
  new_price: number;
  errors: string[];
}

// Resposta completa do endpoint /validate
export interface ValidateResponse {
  valid: boolean;
  results: ValidationResult[];
}

// Estado geral da aplicação
export type AppState = 'idle' | 'validating' | 'validated' | 'updating' | 'success' | 'error';
