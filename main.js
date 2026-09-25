const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');

function createWindow(){
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    backgroundColor: '#081019',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false
    }
  });
  win.loadFile(path.join(__dirname, 'index.html'));
}

async function fetchUrl(url){
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(), 20000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9'
      }
    });
    const text = await response.text();
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    if(text.length < 100) throw new Error('Empty response');
    return { ok:true, status:response.status, url:response.url, text };
  } finally { clearTimeout(timer); }
}

ipcMain.handle('http-fetch', async (_event, url) => {
  if(typeof url !== 'string' || !/^https:\/\/(www\.)?skysports\.com\//i.test(url)){
    throw new Error('Only Sky Sports HTTPS URLs are permitted');
  }
  return await fetchUrl(url);
});

app.whenReady().then(()=>{
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback)=>callback(false));
  createWindow();
  app.on('activate', ()=>{ if(BrowserWindow.getAllWindows().length===0) createWindow(); });
});
app.on('window-all-closed', ()=>{ if(process.platform !== 'darwin') app.quit(); });
