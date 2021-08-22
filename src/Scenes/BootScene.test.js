const BootScene = require("./BootScene")
// @ponicode
describe("preload", () => {
    let inst

    beforeEach(() => {
        inst = new BootScene.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.preload()
        }
    
        expect(callFunction).not.toThrow()
    })
})
