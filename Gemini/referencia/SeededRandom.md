# Referencia de src/simulation/SeededRandom.js

Instantánea 853fb188222deff59c4a145335de1a97ca3cd67b. Código técnico existente, sin datos de planta.
Adjuntar en la etapa del motor. Es referencia, no un archivo para pegar directamente
en Apps Script. Adaptar import/export a la carga modular descrita en ARQUITECTURA.
No afirmar equivalencia hasta ejecutar las pruebas. Mantener fórmulas y orden numérico.

```javascript
export function createSeededRandom(seed) {
  let state = normalizeSeed(seed);

  return {
    next() {
      state = (state + 0x6d2b79f5) >>> 0;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    }
  };
}

function normalizeSeed(seed) {
  if (!Number.isInteger(seed)) {
    return 0;
  }

  return seed >>> 0;
}

```
