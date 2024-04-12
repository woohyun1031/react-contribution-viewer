import { NAMESPACE } from '../../constants/contribution';
import { getClassName } from '../common';

describe('getClassName function', () => {
  it('should return a class name without stylesArray', () => {
    const className = getClassName('testName');
    expect(className).toBe(`${NAMESPACE}__testName`);
  });

  it('should return a class name with stylesArray', () => {
    const className = getClassName('testName', ['style1', 'style2']);
    expect(className).toBe(`${NAMESPACE}__testName style1 style2`);
  });

  it('should return a class name with additional stylesArray elements', () => {
    const className = getClassName('testName', ['style1']);
    expect(className).toBe(`${NAMESPACE}__testName style1`);
  });

  it('should handle empty stylesArray', () => {
    const className = getClassName('testName', []);
    expect(className).toBe(`${NAMESPACE}__testName`);
  });
});
