# hrrun

[![Node.js CI](https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]()

Fast, minimal, extensible task runner built with Node.js. Run tasks, JavaScript files, and a startup script from a single CLI.

## Features

- ⚡ **Fast** — lightweight CLI with no heavy dependencies
- 📦 **Task system** — register tasks as `tasks/<name>.js` exporting a `run()` function
- 📄 **Run files** — execute any `.js` file in the project folder with `hrrun file <file>`
- 🚀 **Startup script** — `hrrun start` runs `start.js` on boot
- 🔧 **Extensible** — add your own commands in `bin/hrrun.js`

## Installation

```bash
git clone https://github.com/<your-username>/hrrun.git
cd hrrun
npm install
```

## Usage

```bash
# List available tasks
node bin/hrrun.js list

# Run a named task from tasks/
node bin/hrrun.js run hello

# Run any JavaScript file in the folder
node bin/hrrun.js file start.js

# Run the startup script
node bin/hrrun.js start
```

## Adding a Task

Create `tasks/<name>.js`:

```js
'use strict';

async function run() {
  console.log('Your task logic here');
}

module.exports = { run };
```

## Project Structure

```
hrrun/
├── bin/hrrun.js      # CLI entry point
├── lib/run.js        # Task runner engine
├── tasks/            # Task definitions
│   └── hello.js
├── start.js          # Startup script
├── package.json
├── .gitignore
└── README.md
```

## License

MIT
