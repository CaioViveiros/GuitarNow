function validar() {
    let usuario = input_usuario.value
    let email = input_email.value
    let senha = input_senha.value
    let confirmacaoSenha = input_confirmacao_senha.value

    const ERROS = {
        campoVazio: 'Por favor, preencha todos os campos para realizar o cadastro',
        emailInvalido: 'Por favor, insira um E-mail válido para realizar o cadastro',
        tamanhoSenhaInvalido: 'Sua senha deve ter no minimo 6 caracteres',
        senhaSemMaiuscula: 'Sua senha deve ter no minimo uma letra maiuscula',
        senhaSemMinuscula: 'Sua senha deve ter no minimo uma letra minuscula',
        senhaSemNumero: 'Sua senha deve ter no minimo um numero',
        senhaSemCaractereEspecial: 'Sua senha deve ter no minimo um caracter especial',
        senhasDiferentes: 'Suas senhas devem ser iguais'
    }

    if (usuario == '') {
        mensagem_alerta.innerHTML = ERROS.campoVazio
        alertar()

    } else if (email == '') {
        mensagem_alerta.innerHTML = ERROS.campoVazio
        alertar()

    } else if (senha == '') {
        mensagem_alerta.innerHTML = ERROS.campoVazio
        alertar()

    } else if (confirmacaoSenha == '') {
        mensagem_alerta.innerHTML = ERROS.campoVazio
        alertar()

    } else if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        mensagem_alerta.innerHTML = ERROS.emailInvalido
        alertar()

    } else {

        const tamanhoSenha = senha.length

        if (tamanhoSenha < 6) {
            mensagem_alerta.innerHTML = ERROS.tamanhoSenhaInvalido
            alertar()

        } else {
            let temMaiuscula = false
            let temMinuscula = false
            let temNumero = false
            let temCaractereEspecial = false
            let senhasIguais = false
            const listaCaracteresEspeciais = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '[', ']', '{', '}', '|', ';', ':', ',', '.', '<', '>', '?']

            for (let posicao = 0; posicao < tamanhoSenha; posicao++) {
                let caractere = senha[posicao]

                if (caractere >= 'A' && caractere <= 'Z') {
                    temMaiuscula = true
                }
                if (caractere >= 'a' && caractere <= 'z') {
                    temMinuscula = true
                }
                if (caractere >= '0' && caractere <= '9') {
                    temNumero = true
                }
                if (listaCaracteresEspeciais.indexOf(caractere) != -1) {
                    temCaractereEspecial = true
                }
            }

            if (temMaiuscula == false) {
                mensagem_alerta.innerHTML = ERROS.senhaSemMaiuscula
                alertar()
            }
            if (temMinuscula == false) {
                mensagem_alerta.innerHTML = ERROS.senhaSemMinuscula
                alertar()
            }
            if (temNumero == false) {
                mensagem_alerta.innerHTML = ERROS.senhaSemNumero
                alertar()
            }
            if (temCaractereEspecial == false) {
                mensagem_alerta.innerHTML = ERROS.senhaSemCaractereEspecial
                alertar()
            }

            if (temMaiuscula && temMinuscula && temNumero && temCaractereEspecial) {
                if (senha != confirmacaoSenha) {
                    mensagem_alerta.innerHTML = ERROS.senhasDiferentes
                    alertar()

                } else {
                    sucessoCadastro()

                    setTimeout(() => {
                        trocarTela()
                    }, 1000);

                    dadosUsuario.push(usuario, email, senha)
                }
            }
        }
    }
}

function trocarTela() {
    div_screen.style.display = 'none'
    div_screen2.style.display = 'flex'
}

function alertar() {
    const alerta = document.getElementById('div_alerta')
    alerta.classList.remove('display-hidden')
    alerta.classList.add('alerta')
}

function fecharAlerta() {
    const alerta = document.getElementById('div_alerta')
    alerta.classList.remove('alerta')
    alerta.classList.add('display-hidden')
}

let nivelExperiencia = 0

const dadosUsuario = []

function cadastrarNivelIniciante() {
    let usuario = dadosUsuario[0]
    let email = dadosUsuario[1]
    let senha = dadosUsuario[2]
    nivelExperiencia = 1
    cadastrar(usuario, email, senha, nivelExperiencia)
}

function cadastrarNivelIntermediario() {
    let usuario = dadosUsuario[0]
    let email = dadosUsuario[1]
    let senha = dadosUsuario[2]
    nivelExperiencia = 2
    cadastrar(usuario, email, senha, nivelExperiencia)
}

function cadastrarNivelAvancado() {
    let usuario = dadosUsuario[0]
    let email = dadosUsuario[1]
    let senha = dadosUsuario[2]
    nivelExperiencia = 3
    cadastrar(usuario, email, senha, nivelExperiencia)
}

function cadastrar(usuario, email, senha, nivelExperiencia) {
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usuarioServer: usuario,
            emailServer: email,
            senhaServer: senha,
            experienciaServer: nivelExperiencia
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                if (nivelExperiencia > 0) {
                    irParaLogin()
                } else {
                    console.log('ERRO: Nivel de experiencia menor que 0')
                }
            } else {
                console.log("ERRO: falha ao tentar realizar o cadastro!")
            }
        })

    return false;
}

function sucessoCadastro() {
    const alerta = document.getElementById('div_sucesso')
    alerta.classList.remove('display-hidden')
    alerta.classList.add('alerta-cadastro')
}
