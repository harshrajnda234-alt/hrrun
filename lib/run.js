'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const HRRUN_DIR = path.join(__dirname, '..');
const TASKS_DIR = path.join(HRRUN_DIR, 'tasks');

async function listTasks() {
  if (!fs.existsSync(TASKS_DIR)) {
    return [];
  }
  return fs.readdirSync(TASKS_DIR)
    .filter((f) => f.endsWith('.js'))
    .map((f) => f.replace(/\.js$/, ''));
}

async function runTask(name) {
  const taskPath = path.join(TASKS_DIR, `${name}.js`);
  if (!fs.existsSync(taskPath)) {
    throw new Error(`Task "${name}" not found`);
  }
  const task = require(taskPath);
  if (typeof task.run !== 'function') {
    throw new Error(`Task "${name}" does not export a run function`);
  }
  return await task.run();
}

async function runFile(file) {
  const filePath = path.resolve(HRRUN_DIR, file);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File "${file}" not found`);
  }
  execSync(`node "${filePath}"`, { stdio: 'inherit', cwd: HRRUN_DIR });
}

async function start() {
  const startFile = path.join(HRRUN_DIR, 'start.js');
  if (!fs.existsSync(startFile)) {
    throw new Error('No start.js found. Create C:\\.hrrun\\start.js to use `hrrun start`.');
  }
  await runFile('start.js');
}

module.exports = { run: runTask, list: listTasks, runFile, start };
