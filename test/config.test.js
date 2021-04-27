require('jest-canvas-mock')
import config from '../src/Config/config';


describe('Test game config', () => {
  it('Testing if model returns an object', () => {
    expect(typeof config).toBe('object');
  });
  it('Testing if that object have the right attributes', () => {
    expect(config).toHaveProperty('type');
  });
  it('Testing if that object have the right attributes', () => {
    expect(config).toHaveProperty('width');
  });
  it('Testing if that object have the right attributes', () => {
    expect(config).toHaveProperty('height');
  });
  it('Testing if that object have the right attributes', () => {
    expect(config).toHaveProperty('backgroundColor');
  });
  it('Testing if that object have the right attributes', () => {
    expect(config).toHaveProperty('physics');
  });
  it('Testing if that object have the right physics settings', () => {
    expect(config.physics).toStrictEqual({ default: 'arcade' });
  });
});
