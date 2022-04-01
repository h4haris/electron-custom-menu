const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    const minimizeButton = document.getElementById("minimize").addEventListener("click", minimizeWindow);
    const closeButton = document.getElementById('close').addEventListener("click", closeWindow);
    const maxUnmaxButton = document.getElementById('max-unmax').addEventListener("click", maxUnmaxWindow);
})

function closeWindow() {
    ipcRenderer.send(`close-window`);
}

function minimizeWindow() {
    ipcRenderer.send(`minimize-window`);
}

function maxUnmaxWindow() {
    ipcRenderer.send(`max-unmax-window`);
}