# RaiWork 1.0.4

# Languages

- ## English

  - ### Initialize the game

    - HTML
      - `<script src="https://raikou320.github.io/raiwork-1.0.4/raiwork.js">`
    - JS
      - `const game = new Game();`

  - ### Add your first scene

    - `game.addScene('sceneName', sceneWidth, sceneHeight, 'sceneBackground')`

  - ### Render your first scene

    - `game.renderScene('sceneName')`

  - ### Stop the render of a scene

    - `game.removeSceneRender('sceneName')`

  - ### Add a scene object

    - `game.addSceneObject('sceneName', object)`

    - rectangle:

      - game.addSceneObject('sceneName', {

        x: xPosition,

        y: yPosition,

        width: width,

        height: height,

        color: 'color',

        drawMode: 'rect',

        })

      - circle:

        - game.addSceneObject('sceneName', {

        x: xPosition,

        y: yPosition,

        radius: radius,

        startAngle: 0,

        endAngle: 2 \* Math.PI,

        color: 'color',

        drawMode: 'arc',

        })

  - ### Find a scene with its name

    - `game.findScene('sceneName')`

  - ### Modify the width of a scene

    - `game.modifySceneWidth('sceneName', newWidth)`

  - ### Modify the height of a scene

    - `game.modifySceneHeight('sceneName', newHeight)`

  - ### Add your first rectangular entity

    - `game.addRectangularEntity('entityName', 'sceneName', entityX, entityY, entityWidth, entityHeight, 'entityColor')`

  - ### Add your first circular entity

    - `game.addCircularEntity('entityName', 'sceneName', entityX, entityY, entityRadius, startAngle (0 for a circle), endAngle (2 * Math.PI for a circle), 'entityColor')`

  - ### Find an entity with its name

    - `game.findEntity('entityName')`

  - ### Log an entity

    - `const entity = game.findEntity('entityName')`
    - `console.log(entity)`

  - ### Add a collider between 2 entities of the same form

    - game.addCollider('entityOne', 'entityTwo', () => {

    console.log('Collision detected !)

    })

  - ### Apply a collider between 2 entities

    - `game.collide('entityOne', 'entityTwo')`

  - ### Move an entity

    - `game.moveEntity('entityName', x, y)`

  - ### Add an input manager

    - `game.addInputManager('managerName')`

  - ### Initialize an input manager

  - `game.initializeInputManager('managerName')`

  - ### Add an input manager callback

    - `game.addInputManagerCallback('managerName', key, state, callback)`

  - ### Initialize the callbacks of an input manager

  - `game.initializeInputManagerCallbacks('managerName')`

# Pro tips

- ## English

  - ### After an update of a scene don't forget to render the scene to view the difference

  - ### For smooth animations use `requestAnimationFrame(()  => (game.renderScene('sceneName'))`

  - ### `game.renderScene('sceneName')` erases the previous frame of the rendered scene

  - ### The state in an input manager callback is pressed or released

  - ### The callback is always a function if ins't directly a function please do an arrow function `() => console.log('the callback is an arrow function)`

# Dev

## Raikou 320
