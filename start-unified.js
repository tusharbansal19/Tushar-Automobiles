#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Automobile Parts E-commerce Application...\n');

// Check if node_modules exists
const fs = require('fs');
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  const install = spawn('npm', ['install'], { stdio: 'inherit' });
  
  install.on('close', (code) => {
    if (code === 0) {
      startServer();
    } else {
      console.error('❌ Failed to install dependencies');
      process.exit(1);
    }
  });
} else {
  startServer();
}

function startServer() {
  console.log('🔧 Starting unified server (Frontend + Backend)...');
  console.log('📱 Frontend will be available at: http://localhost:3000');
  console.log('🔌 API will be available at: http://localhost:3000/api');
  console.log('🏥 Health check: http://localhost:3000/api/health\n');
  
  const server = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });
  
  server.on('close', (code) => {
    console.log(`\n🛑 Server stopped with code ${code}`);
  });
  
  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.kill('SIGINT');
    process.exit(0);
  });
}