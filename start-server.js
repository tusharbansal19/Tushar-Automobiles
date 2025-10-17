#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Tushar Automobiles Server with Auto Parts Database...\n');

// Start the server
const serverProcess = spawn('node', ['server/index.js'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

serverProcess.on('error', (error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

serverProcess.on('close', (code) => {
  console.log(`\n🔒 Server process exited with code ${code}`);
  process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  serverProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server...');
  serverProcess.kill('SIGTERM');
});