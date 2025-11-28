/**
 * Contact Form Module
 * Floating labels, phone mask, validation and AJAX submission with modal feedback
 */

function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;

    const formModule = new ContactForm(form);
    formModule.init();
}

class ContactForm {
    constructor(form) {
        this.form = form;
        this.formId = form.dataset.formId;
        this.fields = form.querySelectorAll('.form-field');
        this.submitBtn = form.querySelector('.form-submit');
        this.submitText = form.querySelector('.form-submit-text');
        this.modal = document.getElementById('form-modal');
        
        this.selectors = {
            nome: '#nome',
            email: '#email',
            telefone: '#telefone',
            mensagem: '#mensagem'
        };
    }

    init() {
        this.setupFloatingLabels();
        this.setupPhoneMask();
        this.setupFormSubmission();
        this.setupModalActions();
    }

    /**
     * Floating Labels
     */
    setupFloatingLabels() {
        this.fields.forEach(field => {
            const input = field.querySelector('.form-input, .form-textarea');
            if (!input) return;

            // Check initial value
            if (input.value.trim() !== '') {
                field.classList.add('has-value');
            }

            // Focus event
            input.addEventListener('focus', () => {
                field.classList.add('is-focused');
            });

            // Blur event
            input.addEventListener('blur', () => {
                field.classList.remove('is-focused');
                
                if (input.value.trim() !== '') {
                    field.classList.add('has-value');
                } else {
                    field.classList.remove('has-value');
                }
            });

            // Input event (for autofill detection)
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    field.classList.add('has-value');
                } else {
                    field.classList.remove('has-value');
                }
            });
        });
    }

    /**
     * Phone Mask (Brazilian format)
     */
    setupPhoneMask() {
        const phoneInput = this.form.querySelector(this.selectors.telefone);
        
        if (!phoneInput) return;

        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }

            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                }
            }

            e.target.value = value;
        });
    }

    /**
     * Form Submission
     */
    setupFormSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!this.validateForm()) {
                return;
            }

            await this.submitForm();
        });
    }

    /**
     * Validate Form
     */
    validateForm() {
        let isValid = true;
        this.clearErrors();

        // Validate nome
        const nome = this.form.querySelector(this.selectors.nome);
        if (!nome.value.trim()) {
            this.showFieldError(nome, 'Por favor, digite seu nome');
            isValid = false;
        }

        // Validate email
        const email = this.form.querySelector(this.selectors.email);
        if (!email.value.trim()) {
            this.showFieldError(email, 'Por favor, digite seu e-mail');
            isValid = false;
        } else if (!this.isValidEmail(email.value)) {
            this.showFieldError(email, 'Por favor, digite um e-mail válido');
            isValid = false;
        }

        // Validate mensagem
        const mensagem = this.form.querySelector(this.selectors.mensagem);
        if (!mensagem.value.trim()) {
            this.showFieldError(mensagem, 'Por favor, digite sua mensagem');
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    showFieldError(input, message) {
        const field = input.closest('.form-field');
        field.classList.add('has-error');
        
        const errorSpan = field.querySelector('.form-error');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    clearErrors() {
        this.fields.forEach(field => {
            field.classList.remove('has-error');
            const errorSpan = field.querySelector('.form-error');
            if (errorSpan) {
                errorSpan.textContent = '';
            }
        });
    }

    /**
     * Submit Form via AJAX
     */
    async submitForm() {
        this.setLoadingState(true);

        try {
            const formData = this.collectFormData();
            
            const response = await fetch(window.contact_form_ajax.ajax_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'delmobile_contact_form',
                    nonce: window.contact_form_ajax.nonce,
                    form_id: this.formId,
                    ...formData
                })
            });

            const data = await response.json();

            if (data.success) {
                this.resetForm();
                this.showModal('success');
            } else {
                // Handle field-specific errors
                if (data.data?.errors) {
                    Object.entries(data.data.errors).forEach(([field, message]) => {
                        const input = this.form.querySelector(`[name="${field}"]`);
                        if (input) {
                            this.showFieldError(input, message);
                        }
                    });
                }
                this.showModal('error');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            this.showModal('error');
        } finally {
            this.setLoadingState(false);
        }
    }

    collectFormData() {
        return {
            nome: this.form.querySelector(this.selectors.nome)?.value || '',
            email: this.form.querySelector(this.selectors.email)?.value || '',
            telefone: this.form.querySelector(this.selectors.telefone)?.value || '',
            mensagem: this.form.querySelector(this.selectors.mensagem)?.value || ''
        };
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.form.classList.add('is-loading');
            this.submitBtn.disabled = true;
            if (this.submitText) {
                this.submitText.textContent = 'Enviando...';
            }
        } else {
            this.form.classList.remove('is-loading');
            this.submitBtn.disabled = false;
            if (this.submitText) {
                this.submitText.textContent = 'Enviar';
            }
        }
    }

    /**
     * Modal
     */
    showModal(state) {
        if (!this.modal) return;

        // Hide all states
        const states = this.modal.querySelectorAll('.form-modal-state');
        states.forEach(s => s.classList.remove('is-active'));

        // Show active state
        const activeState = this.modal.querySelector(`[data-state="${state}"]`);
        if (activeState) {
            activeState.classList.add('is-active');
        }

        // Open modal
        this.modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        // Pause Lenis smooth scroll
        if (window.lenis) {
            window.lenis.stop();
        }
    }

    closeModal() {
        if (!this.modal) return;

        this.modal.classList.remove('is-open');
        document.body.style.overflow = '';

        // Resume Lenis smooth scroll
        if (window.lenis) {
            window.lenis.start();
        }
    }

    setupModalActions() {
        if (!this.modal) return;

        // Close modal buttons
        const closeButtons = this.modal.querySelectorAll('[data-action="close-modal"]');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Retry button
        const retryBtn = this.modal.querySelector('[data-action="retry"]');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                this.closeModal();
                this.submitForm();
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('is-open')) {
                this.closeModal();
            }
        });
    }

    resetForm() {
        this.form.reset();
        this.clearErrors();
        
        // Reset floating labels
        this.fields.forEach(field => {
            field.classList.remove('has-value', 'is-focused');
        });
    }
}

// Export to window
window.initContactForm = initContactForm;
