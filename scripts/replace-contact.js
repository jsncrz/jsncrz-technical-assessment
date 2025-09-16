var replaceContact = function () {
        const contactSection = document.createElement('div');
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
        document.querySelector('.contact-form__content').insertAdjacentElement('afterend', contactSection);

        const forms = document.querySelectorAll('.contact-form__form');
        for (i = 0; i < forms.length; i++) {
                forms[i].remove();
        }

        contactButton.addEventListener('click', function () {
                createContactModal(forms);
        })
}
var createContactModal = function (modalContent) {
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
                                <div class="progress-container">
                                        <div class="progress-tracker">
                                                <div class="progress-line"></div>
                                                <div class="step">
                                                <div class="step-circle active user-information-step">
                                                        <div class="step-icon">&#128203;</div>
                                                        <div class="check-icon hidden"></div>
                                                </div>
                                                </div>

                                                <div class="step">
                                                <div class="step-circle pending inquiry-step">
                                                        <div class="step-icon">&#128270;</div>
                                                        <div class="check-icon hidden"></div>
                                                </div>
                                                </div>

                                                <div class="step">
                                                <div class="step-circle pending complete-step">
                                                        <div class="step-icon">&#9989;</div>
                                                </div>
                                                </div>
                                        </div>
                                </div>
                                <div class="contact-modal-body">
                                </div>
                        </div>
                        `;
                document.body.appendChild(modal);
                var modalBody = modal.querySelector('.contact-modal-body');
                for (i = 0; i < modalContent.length; i++) {
                        const currentModal = modalContent[i];
                        modalBody.append(currentModal);
                        var modalDisplayStyle = currentModal.currentStyle ? currentModal.currentStyle.display :
                              getComputedStyle(currentModal, null).getPropertyValue('display');
                        modalDisplayStyle = modalDisplayStyle == 'block' ? 'grid' : 'none';
                        var originalElements = Array.from(currentModal.querySelector('form').children);

                        for (let i = 0; i < 2 ; i++) {
                                originalElements[i].style.display = 'block'
                        }
                        for (let i = 2; i < originalElements.length; i++) {
                                originalElements[i].style.display = 'none'
                        }
                        const buttonDiv = document.createElement('div');
                        buttonDiv.classList.add(`contact-modal-footer`);
                        buttonDiv.style.display = modalDisplayStyle;
                        const stepOneNextButton = document.createElement('button');
                        stepOneNextButton.classList.add('contact-modal-next', 'contact-button');
                        stepOneNextButton.textContent = 'Next';
                        const stepTwoBackButton = document.createElement('button');
                        stepTwoBackButton.classList.add('contact-modal-back', 'contact-button');
                        stepTwoBackButton.style.display = 'none';
                        stepTwoBackButton.textContent = 'Back';
                        const stepTwoSubmitButton = document.createElement('button');
                        stepTwoSubmitButton.classList.add('contact-modal-submit', 'contact-button');
                        stepTwoSubmitButton.style.display = 'none';
                        stepTwoSubmitButton.textContent = 'Submit';

                        stepOneNextButton.addEventListener('click', function () {
                                if (currentModal.querySelector('div.hs_firstname.hs-firstname.hs-fieldtype-text.field.hs-form-field input').checkValidity() &&
                                        currentModal.querySelector('div.hs_email.hs-email.hs-fieldtype-text.field.hs-form-field input').checkValidity()
                                ) {
                                        stepOneNextButton.style.display = 'none';
                                        stepTwoBackButton.style.display = 'block';
                                        stepTwoSubmitButton.style.display = 'block';
                                        var originalElements = Array.from(currentModal.querySelector('form').children);
                                        for (let i = 0; i < 2 && i < originalElements.length; i++) {
                                                originalElements[i].style.display = 'none'
                                        }
                                        for (let i = 2; i < 6; i++) {
                                                originalElements[i].style.display = 'block'
                                        }
                                        modal.querySelector('.progress-line').style.background = 'linear-gradient(to right, #4285f4 50%, #e0e0e0 50%)';
                                        modal.querySelector('.user-information-step').classList.add('completed');
                                        modal.querySelector('.user-information-step').classList.remove('active');
                                        modal.querySelector('.inquiry-step').classList.add('active');
                                        modal.querySelector('.inquiry-step').classList.remove('pending');
                                        modal.querySelector('.user-information-step .check-icon').classList.remove('hidden');
                                } else {
                                        currentModal.querySelector('div.hs_firstname.hs-firstname.hs-fieldtype-text.field.hs-form-field input').reportValidity();
                                        currentModal.querySelector('div.hs_email.hs-email.hs-fieldtype-text.field.hs-form-field input').reportValidity();
                                } 
                        });
                        stepTwoBackButton.addEventListener('click', function () {
                                modal.querySelector('.inquiry-step').classList.remove('active');
                                modal.querySelector('.inquiry-step').classList.add('pending');
                                modal.querySelector('.user-information-step').classList.add('active');
                                modal.querySelector('.progress-line').style.background = 'linear-gradient(to right, #4285f4 0%, #e0e0e0 0%)';
                                stepOneNextButton.style.display = 'block';
                                stepTwoBackButton.style.display = 'none';
                                stepTwoSubmitButton.style.display = 'none';
                                var originalElements = Array.from(currentModal.querySelector('form').children);
                                for (let i = 0; i < 2 && i < originalElements.length; i++) {
                                        originalElements[i].style.display = 'block'
                                }
                                for (let i = 2; i < 6; i++) {
                                        originalElements[i].style.display = 'none'
                                }
                        });
                        stepTwoSubmitButton.addEventListener('click', function () {
                                if (currentModal.querySelector('form').checkValidity()) {
                                        // Disable trigger to submit button so server doesn't actually send the form
                                        // currentModal.querySelector('.hs-submit .actions input').click();
                                        modal.querySelector('.progress-line').style.background = 'linear-gradient(to right, #4285f4 100%, #e0e0e0 100%)';
                                        modal.querySelector('.inquiry-step').classList.add('completed');
                                        modal.querySelector('.inquiry-step').classList.remove('active');
                                        modal.querySelector('.inquiry-step .check-icon').classList.remove('hidden');
                                        modal.querySelector('.complete-step').classList.add('active');
                                        modal.querySelector('.complete-step').classList.remove('pending');
                                        stepOneNextButton.style.display = 'none';
                                        stepTwoBackButton.style.display = 'none';
                                        stepTwoSubmitButton.style.display = 'none';
                                        var originalElements = Array.from(currentModal.querySelector('form').children);
                                
                                        for (let i = 0; i < originalElements.length; i++) {
                                                originalElements[i].style.display = 'none'
                                        }
                                } else {
                                        currentModal.querySelector('form').reportValidity();
                                }
                        });

                        currentModal.querySelector('.hs-submit').style.display = 'hidden';
                        buttonDiv.appendChild(stepOneNextButton);
                        buttonDiv.appendChild(stepTwoBackButton);
                        buttonDiv.appendChild(stepTwoSubmitButton);
                        modal.querySelector('.contact-modal-body').appendChild(buttonDiv);
                }

                // Global functions for modal interaction
                window.closeContactModal = function () {
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

                window.handleModalAction = function () {
                        closeContactModal();
                };

                // Close modal when clicking outside
                modal.addEventListener('click', function (e) {
                        if (e.target === modal) {
                                closeContactModal();
                        }
                });

                // Close modal with ESC key
                document.addEventListener('keydown', function (e) {
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
        .contact-form__form {
                background-color: #fff !important;
        }
        .hbspt-form .hs-error-msgs .hs-error-msg {
                background-color: #fff !important;
        }
        .progress-container {
            max-width: 350px;
            width: 100%;
            margin: 0 auto;
        }

        .progress-tracker {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            margin-bottom: 20px;
        }

        .progress-line {
            position: absolute;
            top: 47%;
            left: 50px;
            right: 50px;
            height: 4px;
            background: linear-gradient(to right, #4285f4 0%, #e0e0e0 0%);
            /* background: linear-gradient(to right, #4285f4 50%, #e0e0e0 50%); */
            /* background: linear-gradient(to right, #4285f4 100%, #e0e0e0 100%); */
            transform: translateY(-50%);
            transition: all 0.3s ease;
            z-index: 1;
        }

        .check-icon {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 24px;
            height: 24px;
            background-color: #34a853;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .check-icon::after {
            content: '✓';
            color: white;
            font-size: 12px;
            font-weight: bold;
        }
        

        .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 2;
        }

        .step-circle {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            position: relative;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .step-circle.completed {
            background-color: #4285f4;
        }

        .step-circle.active {
            background-color: #4285f4;
        }

        .step-circle.pending {
            background-color: #e0e0e0 ;
            border: 2px solid #e0e0e0;
        }

        .step-icon {
            font-size: 28px;
            color: white;
        }


        .step-circle::before {
            color: #4285f4;
            width: 130px;
            position: absolute;
            text-align: center;
            bottom: -30px;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
        }

        .step-circle.active::before {
            font-weight: 700;
        }

        .step-circle.pending::before {
            color: #9e9e9e;
        }

        .user-information-step::before {
            content: "User Information";
        }

        .inquiry-step::before {
            content: "Inquiry";
        }

        .complete-step::before {
            content: "Complete";
        }
        .hidden {
            display: none;
        }
        
        .contact-modal-footer {
                grid-template-columns: repeat(3, 30%);
                grid-gap: 15px;
        }
        
        .contact-modal-footer .contact-button {
                padding: 15px;
                background-color: #4285f4;
                color: #fff;
                border-radius: 10px;
        }
        
        .contact-modal-footer .contact-modal-next {
                grid-column-start: 3
        }
        
        .contact-modal-footer .contact-modal-back {
                grid-column-start: 2;
                background-color: #fff;
                color: #5f5f5f;
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
                padding: 2em;
        }
        .contact-glassmoriphism h1 {
                padding: 15px 0;
        }
        .contact-glassmorphism button {
                color: #fff;
                background-color: #508336;
                padding: 3px 10px 3px 10px;
                margin: 15px 0
                font-size: 16px;
                font-weight: bold;
                text-shadow: 0px 2px #335325;
                border: 0;
                transition: all 0.3s ease;
                -webkit-box-shadow: 0px -6px 0px 0px #67a346, 0px 6px 0px 0px #335325, 6px 0px 0px 0px #335325, -6px 0px 0px 0px #335325, 0px -6px 0px 3px #000000, 0px 6px 0px 3px #000000, 6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000, 0px 12px 0px 3px #88888888, -6px 6px 0px 3px #88888888,  6px 6px 0px 3px #88888888;
                box-shadow: 0px -6px 0px 0px #67a346, 0px 6px 0px 0px #335325, 6px 0px 0px 0px #335325, -6px 0px 0px 0px #335325, 0px -6px 0px 3px #000000, 0px 6px 0px 3px #000000, 6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000, -6px 0px 0px 3px #000000, 0px 12px 0px 3px #88888888, -6px 6px 0px 3px #88888888,  6px 6px 0px 3px #88888888;
                cursor: pointer;
                float: right;
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

document.querySelector('.contact-glassmorphism-container button').click()