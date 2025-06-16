
// Em vez de interfaces TypeScript, podemos usar JSDoc para documentar as formas dos objetos se desejado,
// ou simplesmente confiar na estrutura implícita dos objetos.

// export interface Team {
//   id: number;
//   name: string;
//   leader: string;
//   players: string[]; // Includes leader, women, liberos, and general players
// }

// Enum InputType é convertido para um objeto constante
export const InputType = {
  TEXTAREA: 'textarea',
  NUMBER: 'number',
};
