import { NAMESPACE } from '../constants/contribution';

export function getClassName(name: string, stylesArray?: string[]): string {
  if (!stylesArray?.length) return `${NAMESPACE}__${name}`;
  return `${NAMESPACE}__${name} ${stylesArray.join(' ')}`;
}
