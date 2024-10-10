/**
 * Encrypts a username and password using SHA-256.
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @returns {Object} An object containing the encrypted username and password.
 */
async function encryptCredentials(username, password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(username + password);
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
  return {
    encryptedUsername: hashHex.slice(0, 32),
    encryptedPassword: hashHex.slice(32)
  };
}

// New function to demonstrate encryption
//async function demonstrateEncryption() {
//    const username = document.getElementById('username').value;
//    const password = document.getElementById('password').value;
    
//    const encrypted = await encryptCredentials(username, password);
    
//    document.getElementById('result').innerHTML = `
//      <p>Encrypted Username: ${encrypted.encryptedUsername}</p>
//      <p>Encrypted Password: ${encrypted.encryptedPassword}</p>
//    `;
//  }

// DDOS Protection
const requestLimits = new Map();
const MAX_REQUESTS = 100;
const TIME_FRAME = 60000; // 1 minute in milliseconds

/**
 * Checks if the request should be allowed based on the IP address.
 * @param {string} ip - The IP address of the request.
 * @returns {boolean} Whether the request should be allowed.
 */
function checkRequestLimit(ip) {
  const now = Date.now();
  if (!requestLimits.has(ip)) {
    requestLimits.set(ip, { count: 1, firstRequest: now });
    return true;
  }

  const limitInfo = requestLimits.get(ip);
  if (now - limitInfo.firstRequest > TIME_FRAME) {
    // Reset if the time frame has passed
    limitInfo.count = 1;
    limitInfo.firstRequest = now;
    return true;
  }

  limitInfo.count++;
  if (limitInfo.count > MAX_REQUESTS) {
    return false; // Limit exceeded
  }

  return true;
}

/**
 * Encrypts credentials and checks for DDOS protection.
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @param {string} ip - The IP address of the request.
 * @returns {Object|null} An object containing the encrypted credentials or null if the request is blocked.
 */
async function secureEncryptCredentials(username, password, ip) {
  if (!checkRequestLimit(ip)) {
    console.warn(`DDOS protection triggered for IP: ${ip}`);
    return null; // Request blocked due to rate limiting
  }

  return await encryptCredentials(username, password);
}

// Updated demonstration function
async function demonstrateEncryption() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const ip = '127.0.0.1'; // In a real scenario, you'd get this from the server

  const result = await secureEncryptCredentials(username, password, ip);

  if (result) {
    document.getElementById('result').innerHTML = `
      <p>Encrypted Username: ${result.encryptedUsername}</p>
      <p>Encrypted Password: ${result.encryptedPassword}</p>
    `;
  } else {
    document.getElementById('result').innerHTML = `
      <p>Request blocked due to rate limiting.</p>
    `;
  }
}



