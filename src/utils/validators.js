// Email validation
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// CPF validation with formatting
export function formatCPF(value) {
  const numbers = value.replace(/\D/g, '')
  return numbers
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function isValidCPF(cpf) {
  const numbers = cpf.replace(/\D/g, '')

  if (numbers.length !== 11) return false

  // Check for known invalid patterns
  if (/^(\d)\1+$/.test(numbers)) return false

  // Validate first digit
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(numbers[9])) return false

  // Validate second digit
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(numbers[10])) return false

  return true
}

// Password validation
export function isValidPassword(password) {
  return password && password.length >= 8
}

// OAB validation (optional field)
export function isValidOAB(oab) {
  if (!oab) return true // Optional field
  // Format: UF + numbers (e.g., SP123456)
  const oabRegex = /^[A-Z]{2}\d{4,6}$/i
  return oabRegex.test(oab.replace(/\s/g, ''))
}

// Full name validation
export function isValidFullName(name) {
  if (!name || name.trim().length < 3) return false
  // At least two words
  const words = name.trim().split(/\s+/)
  return words.length >= 2 && words.every(word => word.length >= 2)
}

// Form validation helper
export function validateForm(values, rules) {
  const errors = {}

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = values[field]

    if (fieldRules.required && (!value || value.trim() === '')) {
      errors[field] = fieldRules.requiredMessage || 'Campo obrigatório'
      continue
    }

    if (value && fieldRules.validate) {
      const error = fieldRules.validate(value, values)
      if (error) {
        errors[field] = error
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
