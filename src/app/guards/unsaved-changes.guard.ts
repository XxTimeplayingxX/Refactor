import { CanDeactivateFn } from '@angular/router';

export interface OnExit{
  onExit: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const rta = confirm('Estás seguro de salir');
  return rta;
};
