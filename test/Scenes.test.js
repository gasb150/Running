// import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import Model from './Model'
import SubmitScore from './Scenes/SubmitScore';
import MenuScene from './Scenes/MenuScene'
import OverScene from './Scenes/OverScene'


describe( 'Testing Scenes Constructor', () => {
    it('Game scene is a function constructor', () => {
        expect(typeof GameScene).toBe('function')

    }) 
})