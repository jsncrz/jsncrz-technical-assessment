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
                                        <div class="contact-modal-thankyou hidden">
                                                <div class="thank-you-container">
                                                        <div class="thank-you-card">
                                                                <h2>Thank You!</h2>
                                                                <p>Your message has been successfully sent.  
                                                                Our team will get back to you shortly.</p>
                                                        </div>
                                                </div>
                                        </div>
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
                                        modal.querySelector('.contact-modal-thankyou').classList.remove('hidden');
                                        stepOneNextButton.style.display = 'none';
                                        stepTwoBackButton.style.display = 'none';
                                        stepTwoSubmitButton.style.display = 'none';
                                        var originalElements = Array.from(currentModal.querySelector('form').children);
                                
                                        for (let i = 0; i < originalElements.length; i++) {
                                                originalElements[i].style.display = 'none'
                                        }
                                        // TODO: Replace this with clearing every input since this doesn't work
                                        // I also tried using the form.reset() method directly on the unchanged site but it also doesn't work
                                        currentModal.querySelector('form').reset()
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

// import css
var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('href', 'https://cdn.jsdelivr.net/gh/jsncrz/jsncrz-technical-assessment@main/styles/contact-style.css');
document.head.appendChild(link);

replaceContact();
