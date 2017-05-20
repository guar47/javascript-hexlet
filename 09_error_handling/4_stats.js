// Dir.js
// BEGIN
export default class extends Node {
  isDirectory() {
    return true;
  }

  isFile() {
    return false;
  }
}
// END

// File.js
// BEGIN
export default class extends Node {
  constructor(name, body) {
    super(name);
    this.body = body;
  }

  getBody() {
    return this.body;
  }

  isDirectory() {
    return false;
  }

  isFile() {
    return true;
  }
}
// END

// Node.js
// BEGIN
export default class {
  constructor(name) {
    this.name = name;
  }

  getStats() {
    return new Stats(this.isFile(), this.isDirectory());
  }

  getName() {
    return this.name;
  }
}
// END

// Stats.js
// BEGIN
export default class {
  constructor(file, directory) {
    this.file = file;
    this.directory = directory;
  }

  isFile() {
    return this.file;
  }

  isDirectory() {
    return this.directory;
  }
}
// END
