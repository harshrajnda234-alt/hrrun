#!/usr/bin/env node
'use strict';

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { run: runTask, list: listTasks, runFile, start } = require('../lib/run');

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .command('run <task>', 'Run a named task', (yargs) => {
      yargs.positional('task', { type: 'string', demandOption: true });
    }, async (argv) => {
      try {
        await runTask(argv.task);
        console.log(`Task "${argv.task}" completed.`);
      } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
      }
    })
    .command('file <file>', 'Run a JavaScript file in the hrrun folder', (yargs) => {
      yargs.positional('file', { type: 'string', demandOption: true });
    }, async (argv) => {
      try {
        await runFile(argv.file);
      } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
      }
    })
    .command('start', 'Run the start.js file in the hrrun folder', async () => {
      try {
        await start();
      } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
      }
    })
    .command('list', 'List available tasks', async () => {
      const tasks = await listTasks();
      console.log('Available tasks:');
      for (const t of tasks) {
        console.log(`  - ${t}`);
      }
    })
    .demandCommand(1, 'Please provide a command. Use `hrrun --help` for usage.')
    .strict()
    .help()
    .alias('h', 'help')
    .parse();
}

main();
