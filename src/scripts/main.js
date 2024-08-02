/*======================================= toggle navbar ===================================*/
let menuIcon = document.querySelector('#menu_icon');
let navBar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navBar.classList.toggle('active');
};

/*======================================= scroll section active link ===================================*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
            });
        }
    });

    /*======================================= sticky navbar ===================================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*======================================= remove toggle icon and navbar ===================================*/
    menuIcon.classList.remove('fa-xmark');
    navBar.classList.remove('active');
};

/*======================================= scroll reveal ===================================*/
ScrollReveal({ 
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, heading, .about-content .heading, .services h2, .planos h2, .portifolio h2, .contact h2', { origin: 'top'});
ScrollReveal().reveal('.home-img, .contact form, .about-content p, .portifolio-box', { origin: 'bottom' }); /*.services-box, fica bugando meu css*/
ScrollReveal().reveal('.home-contact h1, .about-img, .about-content h3, .services, .planos', { origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-contact', { origin: 'right' });

/*======================================= typed js ===================================*/
const typed = new Typed('.multiple-text', {
    strings: ['Sites', 'Sistemas Web', 'Landing Pages'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

/*======================================= send email smtp.js ===================================*/


function emailSend(event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    let userName = document.getElementById('name').value;
    let userEmail = document.getElementById('email').value;
    let userPhone = document.getElementById('phone').value;
    let userMessage = document.getElementById('mensagem').value;
    let userSubject = document.getElementById('subject').value;

    let messageBody = `
        Nome: ${userName} <br/>
        Telefone: ${userPhone} <br/>
        Email: ${userEmail} <br/>
        Assunto: ${userSubject} <br/>
        Mensagem do site Portfólio: ${userMessage}
    `;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "julioduartebatista753@gmail.com",
        Password: "E1417025037A01E4DEFA15D28FF082EE3AC3",
        To: 'julioduartebatista753@gmail.com',
        From: "julioduartebatista753@gmail.com",
        Subject: "Cliente Site WebSculptors",
        Body: messageBody,
    }).then(
        message => {
            if (message === 'OK') {
                swal("Mensagem enviada com sucesso!", "Pressione Ok", "success");
            } else {
                swal("Erro ao enviar o email", "Tente novamente!", "error");
            }
        }
    );
};

/*======================================= mask phone number ===================================*/

document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.querySelector('form');

    phoneInput.addEventListener('input', function(e) {
        // Remove todos os caracteres não numéricos
        let value = e.target.value.replace(/\D/g, '');
        
        // Limita o comprimento a 11 caracteres (9 dígitos + 2 para o DDD)
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        // Aplica a máscara
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona parênteses
        value = value.replace(/(\d{5})(\d)/g, '$1-$2'); // Adiciona o hífen
        
        // Atualiza o valor do campo
        e.target.value = value;
    });

    phoneInput.addEventListener('keydown', function(e) {
        // Permite apenas números e teclas de controle (backspace, delete, setas)
        const allowedKeys = [
            'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'
        ];
        
        if (allowedKeys.includes(e.key) || /^[0-9]$/.test(e.key)) {
            return;
        }
        
        e.preventDefault();
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita o envio padrão do formulário

        // Desabilita o botão de envio
        submitBtn.disabled = true;
         // Limpa os campos do formulário
        form.reset();
        submitBtn.value = "Enviando...";

        // Simula o envio com um atraso de 5 segundos (5000 ms)
        setTimeout(function() {
           
            

            // Reabilita o botão de envio após o atraso
            submitBtn.disabled = false;
            submitBtn.value = "Enviar Mensagem";
        }, 5000); // 5 segundos
    });
});