const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const output = document.getElementById("output");
const context = canvas.getContext("2d");

function iniciarLeitor() {
    navigator.mediaDevices.getUserMedia({
    video: { facingMode: { exact: "environment" } }
    }).then(stream => {
    video.srcObject = stream;
    video.style.display = "block";
    video.play();
    requestAnimationFrame(scanQRCode);
    }).catch(err => {
    output.textContent = "Erro ao acessar a câmera: " + err.message;
    output.style.color = "red";
    });
}

function scanQRCode() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
    const conteudo = code.data;
    output.textContent = `✅ QR Code detectado: ${conteudo}`;

      // Verifica se é um link válido
    if (conteudo.startsWith("http://") || conteudo.startsWith("https://")) {
        setTimeout(() => {
          window.location.href = conteudo; // Redireciona para o link
        }, 1000); // Pequeno delay para o usuário ver a mensagem
        }

      return; // Para escanear após detectar
    }
    }
    requestAnimationFrame(scanQRCode);
}
