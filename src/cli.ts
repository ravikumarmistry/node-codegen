import {Command} from 'commander';
import * as packageInfo from '../package.json';
import initCommandHandler from './command-handlers/init-command-handler';
import newCommandHandler from './command-handlers/new-command-handler';
import runCommandHandler from './command-handlers/run-command-handler';
import { HumanizedError } from './helpers/HumanizedError';
import { actionRunner } from './helpers/utility';

const program = new Command();
program
  .version((packageInfo as any).version)
  .name((packageInfo as any).name)
  .description('Codegen CLI');

program
  .command('init [args]')
  .description('initialize codegen in current directory')
  .action(actionRunner(initCommandHandler, errorHandler));

program
  .command('new <template-name>')
  .alias('n')
  .description('Create a new template')
  .action(actionRunner(newCommandHandler, errorHandler));

program
  .command('run <template-name> [args]')
  .alias('r')
  .description('Run a template')
  .action(actionRunner(runCommandHandler, errorHandler));


function errorHandler (error) {
  if(error.name == 'HumanizedError') {
    var err = error as HumanizedError;
    err.print();
  }
  else {
    throw error;
  }
  process.exit(1);
}
program.parse(process.argv);