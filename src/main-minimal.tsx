// src/main.tsx - MINIMAL VERSION FOR TESTING
import React from "react";
import { createRoot } from "react-dom/client";

// Force light mode
document.documentElement.setAttribute('data-bs-theme', 'light');

// Minimal App Component for testing
function MinimalApp() {
  console.log('MinimalApp rendering...');
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Minimal App Test</h1>
      <p>If you can see this, React is working without Redux.</p>
      <button onClick={() => {
        console.log('Button clicked');
        alert('Button works!');
      }}>
        Test Button
      </button>
    </div>
  );
}

console.log('Starting minimal React app...');

const container = document.getElementById("root");
if (!container) {
  console.error("Failed to find the root element");
  throw new Error("Failed to find the root element");
}

console.log('Root container found, creating React root...');

try {
  const root = createRoot(container);
  console.log('React root created, rendering app...');
  
  root.render(<MinimalApp />);
  console.log('App rendered successfully!');
} catch (error) {
  console.error('Error during rendering:', error);
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  container.innerHTML = `<h1 style="color: red;">Error: ${errorMessage}</h1>`;
}
