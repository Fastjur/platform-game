import { DataFile } from './main/Datafile'
import { World } from './universe/World'
import { Level } from './universe/Level'
import { Entity } from './universe/Entity'
import { Canvas } from './graphics/Canvas'
import { Drawable } from './graphics/Drawable'
import { KeyHandler } from './main/KeyHandler'


let settingsFile: DataFile = new DataFile('../res/settings.json', function() {
  let levelFile: DataFile = new DataFile('../res/levelfile.json', function() {

    let world: World = new World(levelFile)
    let currentlevel: Level = world.getLevel(0)
    let canvas: Canvas = new Canvas(window, settingsFile)
    let keyHandler: KeyHandler = new KeyHandler(settingsFile)
    let timestamp: number = +new Date()

    // rendering loop
    let drawFrame = () => {
      // calculate time between frames
      let newTimestamp = +new Date()
      let frameTime = newTimestamp - timestamp
      timestamp = newTimestamp

      // clear previous frame
      canvas.clearFrame()

      // draw all drawables in current level
      currentlevel.getDrawableEntities().map((drawable: Drawable) => {
        drawable.draw(canvas.getRenderingContext())
      })

      window.requestAnimationFrame(drawFrame)
    }

    // link keystroke events to handler
    window.addEventListener('keyup', (ev: KeyboardEvent) => keyHandler.onKeyEvent(ev) )
    window.addEventListener('keydown', (ev: KeyboardEvent) => keyHandler.onKeyEvent(ev) )
     

    // start drawing
    drawFrame()
  })
})

