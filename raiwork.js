class InputManager {
  constructor(name) {
    this.name = name;
    this.keys = {};
    this.callbacks = [];
  }
  pressKey(key) {
    this.keys[key] = 'pressed';
  }
  releaseKey(key) {
    this.keys[key] = 'released';
  }
  addCallback(key, state, callbackFn) {
    if (typeof callbackFn !== 'function') {
      console.warn('The callback is not a function at an input manager');
      return;
    }
    const callback = {
      key: key,
      state: state,
      callback: callbackFn,
    };
    this.callbacks.push(callback);
  }
  initializeCallbacks() {
    document.addEventListener('keydown', (e) => {
      const callback = this.callbacks.find(
        (callback) => callback.key === e.key && callback.state === 'pressed'
      );
      if (callback) {
        callback.callback();
      }
    });
    document.addEventListener('keyup', (e) => {
      const callback = this.callbacks.find(
        (callback) => callback.key === e.key && callback.state === 'released'
      );
      if (callback) {
        callback.callback();
      }
    });
  }
}
class Collider {
  constructor(object1, object2, callback) {
    this.object1 = object1;
    this.object2 = object2;
    typeof callback === 'function'
      ? (this.callback = callback)
      : console.warn('The callback is not a function');
  }
  collide() {
    if (
      (!this.object1.x && !this.object1.x === 0) ||
      (!this.object1.y && !this.object1.y === 0)
    ) {
      return console.warn('Missing X or Y at object 1 of collider');
    }
    if (
      (!this.object2.x && !this.object2.x === 0) ||
      (!this.object2.y && !this.object2.y === 0)
    ) {
      return console.warn('Missing X or Y at object 2 of collider');
    }
    if (
      this.object1.width &&
      this.object2.width &&
      this.object1.height &&
      this.object2.height
    ) {
      if (
        this.object1.x < this.object2.x + this.object2.width &&
        this.object1.x + this.object1.width > this.object2.x &&
        this.object1.y < this.object2.y + this.object2.height &&
        this.object1.y + this.object1.width > this.object2.y
      ) {
        this.callback();
      }
    }
    if (this.object1.r && this.object2.r) {
      const distanceX = this.object1.x - this.object2.x;
      const distanceY = this.object1.y - this.object2.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (distance < this.object1.r + this.object2.r) {
        this.callback();
      }
    }
  }
}

class Entity {
  constructor(name, x, y, color) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  move(x, y) {
    this.x += x;
    this.y += y;
  }
}

class EntityRect extends Entity {
  constructor(name, x, y, width, height, color) {
    super(name, x, y, color);
    this.width = width;
    this.height = height;
    this.drawMode = 'rect';
  }
  move(x, y) {
    super.move(x, y);
  }
}

class EntityArc extends Entity {
  constructor(name, x, y, radius, startAngle, endAngle, color) {
    super(name, x, y, color);
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.drawMode = 'arc';
  }
  move(x, y) {
    super.move(x, y);
  }
}

class Scene {
  constructor(name, width, height, background) {
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.name = name;
    this.objects = [];
    this.body = document.body;
    this.background = background;
  }
  render() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.body.appendChild(this.canvas);
    this.ctx.beginPath();
    this.ctx.fillStyle = this.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.closePath();
    this.objects.forEach((object) => {
      this.ctx.beginPath();
      this.ctx.fillStyle = object.color;
      const drawMode = object.drawMode;
      if (drawMode === 'rect' || drawMode === 'rectangle') {
        this.ctx.rect(object.x, object.y, object.width, object.height);
        this.ctx.fill();
        if (object.stroke) this.ctx.stroke();
      } else if (drawMode === 'circle' || drawMode === 'arc') {
        this.ctx.arc(
          object.x,
          object.y,
          object.radius,
          object.startAngle,
          object.endAngle
        );
        this.ctx.fill();
        if (object.stroke) this.ctx.stroke();
      }
    });
    this.ctx.closePath();
  }
  removeRender() {
    this.body.removeChild(this.canvas);
  }
  addObject(object) {
    this.objects.push(object);
  }
}

class Game {
  constructor() {
    this.scenes = [];
    this.colliders = [];
    this.entitys = [];
    this.InputManagers = [];
  }
  addScene(name, width, height, background) {
    const scene = new Scene(name, width, height, background);
    this.scenes.push(scene);
  }
  addSceneObject(sceneName, object) {
    const index = this.scenes.findIndex((scene) => scene.name === sceneName);
    if (index !== -1) {
      this.scenes[index].addObject(object);
    } else {
      console.warn(sceneName, 'This scene name is not correct did you mean:');
      this.scenes.forEach((scene) => console.warn(scene.name));
    }
  }
  modifySceneWidth(sceneName, newWidth) {
    const index = this.scenes.findIndex((scene) => scene.name === sceneName);
    if (index !== -1) {
      this.scenes[index].width = newWidth;
    } else {
      console.warn(sceneName, 'This scene name is not correct did you mean:');
      this.scenes.forEach((scene) => console.warn(scene.name));
    }
  }
  modifySceneHeight(sceneName, newHeight) {
    const index = this.scenes.findIndex((scene) => scene.name === sceneName);
    if (index !== -1) {
      this.scenes[index].height = newHeight;
    } else {
      console.warn(sceneName, 'This scene name is not correct did you mean:');
      this.scenes.forEach((scene) => console.warn(scene.name));
    }
  }
  renderScene(sceneName) {
    const index = this.scenes.findIndex((scene) => scene.name === sceneName);
    if (index !== -1) {
      this.scenes[index].render();
    } else {
      console.warn(sceneName, 'This scene name is not correct did you mean:');
      this.scenes.forEach((scene) => console.warn(scene.name));
    }
  }
  findScene(sceneName) {
    const index = this.scenes.findIndex((scene) => scene.name === sceneName);
    if (index !== -1) {
      const scene = this.scenes[index];
      return scene;
    } else {
      console.warn(sceneName, 'This scene name is not correct did you mean:');
      this.scenes.forEach((scene) => console.warn(scene.name));
    }
  }
  removeSceneRender(sceneName) {
    const index = this.scenes.findIndex((scene) => scene.name === sceneName);
    if (index !== -1) {
      this.scenes[index].removeRender();
    } else {
      console.warn(sceneName, 'This scene name is not correct did you mean:');
      this.scenes.forEach((scene) => console.warn(scene.name));
    }
  }
  addRectangularEntity(name, sceneName, x, y, width, height, color) {
    const index = this.scenes.findIndex((scene) => scene.name === sceneName);
    if (index !== -1) {
      const entity = new EntityRect(name, x, y, width, height, color);
      this.addSceneObject(sceneName, entity);
      this.entitys.push(entity);
    } else {
      console.warn(sceneName, 'This scene name is not correct did you mean:');
      this.scenes.forEach((scene) => console.warn(scene.name));
    }
  }
  addCircularEntity(
    name,
    sceneName,
    x,
    y,
    radius,
    startAngle,
    endAngle,
    color
  ) {
    const index = this.scenes.findIndex((scene) => scene.name === sceneName);
    if (index !== -1) {
      const entity = new EntityArc(
        name,
        x,
        y,
        radius,
        startAngle,
        endAngle,
        color
      );
      this.addSceneObject(sceneName, entity);
      this.entitys.push(entity);
    } else {
      console.warn(sceneName, 'This scene name is not correct did you mean:');
      this.scenes.forEach((scene) => console.warn(scene.name));
    }
  }
  findEntity(name) {
    const index = this.entitys.findIndex((entity) => entity.name === name);
    if (index !== -1) {
      const entity = this.entitys[index];
      return entity;
    } else {
      return console.warn('Not entity with name', name);
    }
  }
  addCollider(object1, object2, callback) {
    const collider = new Collider(object1, object2, callback);
    this.colliders.push(collider);
  }
  collide(object1, object2) {
    const index = this.colliders.findIndex(
      (collider) => collider.object1 === object1 && collider.object2 === object2
    );
    if (index !== -1) {
      this.colliders[index].collide();
    } else {
      console.warn('Collider object non correct did you mean:');
      this.colliders.forEach((collider) =>
        console.warn(collider.object1 + ' ' + collider.object2)
      );
    }
  }
  moveEntity(name, x, y) {
    const index = this.entitys.findIndex((entity) => entity.name === name);
    if (index !== -1) {
      this.entitys[index].move(x, y);
    } else {
      console.warn('This entity name is not correct did you mean:');
      this.entitys.forEach((entity) => console.warn(entity.name));
    }
  }
  addInputManager(name) {
    const inputManager = new InputManager(name);
    this.InputManagers.push(inputManager);
  }
  initializeInputManagerKeys(name) {
    const index = this.InputManagers.findIndex(
      (inputManager) => inputManager.name === name
    );
    if (index !== -1) {
      document.addEventListener('keydown', (e) =>
        this.InputManagers[index].pressKey(e.key)
      );
      document.addEventListener('keyup', (e) =>
        this.InputManagers[index].releaseKey(e.key)
      );
    } else {
      console.warn('No Input Manager with this name did you mean:');
      this.InputManagers.forEach((inputManager) =>
        console.warn(inputManager.name)
      );
    }
  }
  addInputManagerCallback(name, key, state, callback) {
    const index = this.InputManagers.findIndex(
      (inputManager) => inputManager.name === name
    );
    if (index !== -1) {
      this.InputManagers[index].addCallback(key, state, callback);
    } else {
      console.warn('No Input Manager with this name did you mean:');
      this.InputManagers.forEach((inputManager) =>
        console.warn(inputManager.name)
      );
    }
  }
  initializeInputManagerCallbacks(name) {
    const index = this.InputManagers.findIndex(
      (inputManager) => inputManager.name === name
    );
    if (index !== -1) {
      this.InputManagers[index].initializeCallbacks();
    } else {
      console.warn('No Input Manager with this name did you mean:');
      this.InputManagers.forEach((inputManager) =>
        console.warn(inputManager.name)
      );
    }
  }
}

window.Game = Game;
