import React, { useEffect, useReducer } from 'react';
export const initialState = { componente: 'Aulas' }
export const Context = React.createContext()
export const reducer = (state, action) => {
    switch (action.route) {
      case "aulas":
        return initialState
      case "alunos":
        return { componente: 'Alunos' }
      case "materia":
        return { componente: 'Materias' }
      default:
        return state
  }
}