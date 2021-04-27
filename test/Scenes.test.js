// import config from './Config/config';
import BootScene from '../src/Scenes/BootScene';
import CreditsScene from '../src/Scenes/CreditsScene';
import GameScene from '../src/Scenes/GameScene';
import InstructionsScene from '../src/Scenes/InstructionScene';
import MenuScene from '../src/Scenes/MenuScene';
import OptionsScene from '../src/Scenes/OptionsScene';
import OverScene from '../src/Scenes/OverScene';
import PreloaderScene from '../src/Scenes/PreloaderScene';
import SubmitScore from '../src/Scenes/SubmitScore';

import TitleScene from '../src/Scenes/TitleScene';


describe('Testing Scenes Constructor', () => {
  it('Over scene is a function constructor', () => {
    expect(typeof OverScene).toBe('function');
  });
  it('Menu scene is a function constructor', () => {
    expect(typeof MenuScene).toBe('function');
  });
  it('Submit scene is a function constructor', () => {
    expect(typeof SubmitScore).toBe('function');
  });
  it('Credit scene is a function constructor', () => {
    expect(typeof CreditsScene).toBe('function');
  });
  it('Options scene is a function constructor', () => {
    expect(typeof OptionsScene).toBe('function');
  });
  it('Game scene is a function constructor', () => {
    expect(typeof GameScene).toBe('function');
  });
  it('Boot scene is a function constructor', () => {
    expect(typeof BootScene).toBe('function');
  });

  it('Preload scene is a function constructor', () => {
    expect(typeof PreloaderScene).toBe('function');
  });

  it('Title scene is a function constructor', () => {
    expect(typeof TitleScene).toBe('function');
  });

  it('Instruction scene is a function constructor', ()=>{
    expect(typeof InstructionsScene).toBe('function')
  })
});