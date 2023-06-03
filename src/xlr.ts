import * as cp from 'child_process';
import { Constants } from "./constants"
import { spawn } from 'node:child_process';

const xlr = (() => {
  let instance: cp.ChildProcess;

  const start = () => {
    const daemon = spawn(`${Constants.MACOS_XLR_DAEMON_PATH}/goxlr-daemon`);
  
    daemon.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    
    daemon.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    
    daemon.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if(instance && (instance.pid === daemon.pid)){
        instance = null;
      }
    });

    if(instance){
      //wait to close first
      forceStop()
    }
  
    instance = daemon;
  }

  const stop = () => {
    if(instance && instance.kill){
      instance.kill()
    } else {
      forceStop()
    }
  }

  const forceStop = () => {
    const cmd = spawn('killall', ['goxlr-daemon']);
  
    cmd.stdout.on('data', (data) => {
      console.log(`cmd stdout: ${data}`);
    });
    
    cmd.stderr.on('data', (data) => {
      console.error(`cmd stderr: ${data}`);
    });
    
    cmd.on('close', (code) => {
      console.log(`cmd child process exited with code ${code}`);
    }); 
  }
  return {
    current: instance,
    start,
    stop,
    forceStop
  }
})()


module.exports = xlr;

