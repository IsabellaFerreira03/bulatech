const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const output = document.getElementById("output");
const context = canvas.getContext("2d");

// Solicita acesso à câmera traseira
navigator.mediaDevices.getUserMedia({
    video: {
    facingMode: { exact: "environment" }
    }
}).then(stream => {
    video.srcObject = stream;
    video.play();
    requestAnimationFrame(scanQRCode);
}).catch(err => {
    output.textContent = "Erro ao acessar a câmera: " + err.message;
});

function scanQRCode() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
    output.textContent = `✅ QR Code detectado: ${code.data}`;
      return; // Para de escanear após detectar
    }
    }
    requestAnimationFrame(scanQRCode);
}
