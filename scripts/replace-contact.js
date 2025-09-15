var replaceContact = function () {
    const contactSection = document.querySelector('div.contact-form__form.kam-world');
    
    const modal = document.createElement('div');
    modal.id = 'contact-modal';
    modal.innerHTML = contactSection.innerHTML;
    contactSection.innerHTML = '';
    contactSection.classList.remove('kam-world');
    contactSection.classList.remove('contact-form__form');
    contactSection.classList.add('contact-glassmorphism');
    
    const contactContainer = document.createElement('div');
    contactContainer.classList.add('contact-glassmorphism-container');
    contactSection.appendChild(contactContainer);

    const contactHeader = document.createElement('h3');
    contactHeader.textContent = 'Hello Conversion!';
    contactContainer.appendChild(contactHeader);

    const contactParagraph = document.createElement('p');
    contactParagraph.textContent = 'Click on the button below to contact us';
    contactContainer.appendChild(contactParagraph);

    const contactButton = document.createElement('button');
    contactButton.textContent = 'Click Here';
    contactContainer.appendChild(contactButton);

    contactButton.addEventListener('click', function() {
        createContactModal(modal);
    })
}
var createContactModal = function(modalContent) {
    // Check if modal already exists and hide it
    const existingModal = document.getElementById('contact-modal');
    if (existingModal) {
        return;
    } else {

        // Create modal HTML
        const modalBackdrop = document.createElement('div');
        modalBackdrop.id = 'contact-modal-backdrop';
        document.body.appendChild(modalBackdrop);
        const modal = document.createElement('div');
        modal.id = 'contact-modal';
        modal.setAttribute('current-state', 0);
        modal.innerHTML = `
            <div class="contact-modal-content">
                <div class="contact-modal-body hbspt-form">
                </div>
            </div>
        `;

        // Add modal content
        const modalBody = modal.querySelector('.contact-modal-body');
        const formBody = modalContent.querySelector('div.hbspt-form form');
        modalBody.appendChild(formBody.cloneNode(false));
        var originalElements = Array.from(formBody.children);

        const stepOne = document.createElement('div');
        stepOne.classList.add('steps');
        stepOne.id = 'step-one';
        // Move first two elements to step 1
        for (let i = 0; i < 2 && i < originalElements.length; i++) {
        const clonedElement = originalElements[i].cloneNode(true);
        stepOne.appendChild(clonedElement);
        }
        
        const stepTwo = document.createElement('div');
        stepTwo.classList.add('steps');
        stepTwo.id = 'step-two';
        // Move remaining elements to step 2
        for (let i = 2; i < originalElements.length; i++) {
        const clonedElement = originalElements[i].cloneNode(true);
        stepTwo.appendChild(clonedElement);
        }
        
        const stepThree = document.createElement('div');
        stepThree.classList.add('steps');
        stepThree.id = 'step-three';
        const newFormBody = modalBody.firstElementChild;
        newFormBody.appendChild(stepOne);
        newFormBody.appendChild(stepTwo);
        newFormBody.appendChild(stepThree);
        
        // Add modal to page
        document.body.appendChild(modal);

        // Global functions for modal interaction
        window.closeContactModal = function() {
            const modal = document.getElementById('contact-modal');
            const modalBackdrop = document.getElementById('contact-modal-backdrop');
            if (modal) {
                modal.style.animation = 'modalAppear 0.4s ease-out reverse';
                setTimeout(() => {
                    modal.remove();
                    modalBackdrop.remove();
                }, 300);
            }
        };

        window.handleModalAction = function() {
            closeContactModal();
        };

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeContactModal();
            }
        });

        // Close modal with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('contact-modal')) {
                closeContactModal();
            }
        });
    }


}

const contactModalStyle = document.createElement('style');
contactModalStyle.textContent = `
        #contact-modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9999;
        }

        #contact-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }

        .contact-modal-content {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            max-width: 500px;
            width: 90%;
            position: relative;
            animation: modalAppear 0.3s ease-out;
        }

        @keyframes modalAppear {
            from {
                opacity: 0;
                transform: scale(0);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        .contact-modal-title {
            margin: 0;
            color: #333;
            font-size: 24px;
            font-weight: 600;
        }

        .contact-modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #666;
            line-height: 1;
            padding: 0;
        }

        .contact-modal-close:hover {
            color: #000;
        }
    `;
document.head.appendChild(contactModalStyle);


replaceContact();

const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
        .contact-glassmorphism {
            height: 300px;
            padding: 3rem 1.25rem;
            position: relative;
        }
        .contact-glassmorphism-container {
            height: 300px;
            background: rgba(255, 255, 255, 0.80);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(7.9px);
            -webkit-backdrop-filter: blur(7.9px);
        }
        .contact-glassmorphism button {
                color: #fff;
                background-color: #508336;
                padding: 3px 10px 3px 10px;
                margin: 5px;
                font-size: 16px;
                font-weight: bold;
                text-shadow: 0px 2px #335325;
                border: 0;
                transition: all 0.3s ease;
                -webkit-box-shadow: 0px -6px 0px 0px #67a346, 0px 6px 0px 0px #335325, 6px 0px 0px 0px #335325, -6px 0px 0px 0px #335325, 0px -6px 0px 3px #000000, 0px 6px 0px 3px #000000, 6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000, 0px 12px 0px 3px #88888888, -6px 6px 0px 3px #88888888,  6px 6px 0px 3px #88888888; 
                box-shadow: 0px -6px 0px 0px #67a346, 0px 6px 0px 0px #335325, 6px 0px 0px 0px #335325, -6px 0px 0px 0px #335325, 0px -6px 0px 3px #000000, 0px 6px 0px 3px #000000, 6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000, 0px 12px 0px 3px #88888888, -6px 6px 0px 3px #88888888,  6px 6px 0px 3px #88888888;
                cursor: pointer;
        }
        .contact-glassmorphism button:hover {
                background-color: #43702d;
        }
        .contact-glassmorphism button:disabled {
                background-color: #ebe5e2;
                color: #928b88;
                -webkit-box-shadow: 0px -6px 0px 0px #ebe5e2, 0px 6px 0px 0px #ebe5e2, 6px 0px 0px 0px #ebe5e2, -6px 0px 0px 0px #ebe5e2, 0px -6px 0px 3px #928b88, 0px 6px 0px 3px #928b88, 6px 0px 0px 3px #928b88, -6px 0px 0px 3px #928b88, -6px 0px 0px 3px #928b88; 
                box-shadow: 0px -6px 0px 0px #ebe5e2, 0px 6px 0px 0px #ebe5e2, 6px 0px 0px 0px #ebe5e2, -6px 0px 0px 0px #ebe5e2, 0px -6px 0px 3px #928b88, 0px 6px 0px 3px #928b88, 6px 0px 0px 3px #928b88, -6px 0px 0px 3px #928b88, -6px 0px 0px 3px #928b88;
                
                text-shadow: none;
        }
        .contact-glassmorphism button:focus {
                -webkit-box-shadow: 0px -6px 0px 0px #67a346, 0px 6px 0px 0px #335325, 6px 0px 0px 0px #335325, -6px 0px 0px 0px #335325, 0px -6px 0px 3px #000000, 0px 6px 0px 3px #000000, 6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000; 
                box-shadow: 0px -6px 0px 0px #67a346, 0px 6px 0px 0px #335325, 6px 0px 0px 0px #335325, -6px 0px 0px 0px #335325, 0px -6px 0px 3px #000000, 0px 6px 0px 3px #000000, 6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000;
                
        }
        .contact-glassmorphism button:active {
                text-shadow: none;
                background-color: #396227;
                -webkit-box-shadow: 0px -6px 0px 0px #396227, 0px 6px 0px 0px #396227, 6px 0px 0px 0px #396227, -6px 0px 0px 0px #396227, 0px -6px 0px 3px #000000, 0px 6px 0px 3px #000000, 6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000; 
                box-shadow: 0px -6px 0px 0px #396227, 0px 6px 0px 0px #396227, 6px 0px 0px 0px #396227, -6px 0px 0px 0px #396227, 0px -6px 0px 3px #000000, 0px 6px 0px 3px #000000, 6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000;
                
        }
    `;
document.head.appendChild(sectionStyle);