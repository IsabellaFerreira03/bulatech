function entrar() {
    const senhaDigitada = document.querySelector(".chave").value;

    if (senhaDigitada === "Florence") {
    window.location.href = "leitor.html"; // Redireciona para a segunda tela
    } else {
    alert(" Senha incorreta. Tente novamente.");
    }
}
