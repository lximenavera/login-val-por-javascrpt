
    document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('loginForm')
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const confirmPasswordInput = document.getElementById('confirmPassword')
    const emailError= document.getElementById('errorEmail')
    const passwordError = document.getElementById('passwordError')
    const confirmPasswordError = document.getElementById('confirmPasswordError')
    const showHideButton = document.getElementById('show-hide')

    loginForm.addEventListener('submit', function(event){
        event.preventDefault();
        validateForm()
    })
    emailInput.addEventListener('blur', function() {
        validateEmail()
    })
    emailInput.addEventListener('change', function() {
        clearError(emailError)
    })
    passwordInput.addEventListener('change', function(){
        clearError(passwordError)
    })
    confirmPasswordInput.addEventListener('change', function(){
        clearError(confirmPasswordError)
    })
    
    showHideButton.addEventListener('click', function () {
         if (passwordInput.type == 'password') {
         passwordInput.type = 'text'
         confirmPasswordInput.type = 'text'
        } else {
        passwordInput.type = 'password'
         confirmPasswordInput.type = 'password'
            }
         })
        
    function validateForm(){
        const isValidEmail = validateEmail()
        const isValidPassword = validatePassword()
        const isValidPasswordMatch = validatePasswordMatch()
  
        if(isValidEmail && isValidPassword && isValidPasswordMatch){
            saveToLocalStorage()
            alert('Has ingresado con exito')
        }
    }
    function validateEmail(){
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const emailValue = emailInput.value.trim()//El trim lo que hace es eliminar espacios vacios al comienxo y final del input
        if(!emailRegex.test(emailValue)){
            showError(emailError, 'Ingresa un email Valido')
            return false
        }
        return true
    }
    function validatePassword(){
        const passwordValue = passwordInput.value.trim()
        if(passwordValue.length < 6){
            showError(passwordError, 'Ingresa una contraseña valida')
            return false;
        }
        return true
    }
    function validatePasswordMatch(){
        const passwordValue =passwordInput.value.trim()
        const confirmPasswordValue = confirmPasswordInput.value.trim()
        if(passwordValue != confirmPasswordValue){
            showError(confirmPasswordError, 'Contraseña diferente')
            return false
        }
        return true
    }
    function showError (errorElement, message){
        errorElement.innerHTML = message;
        errorElement.style.display ='block';
    }
    function clearError (errorElement){
        errorElement.innerHTML = '';
        errorElement.style.display ='none';
    }
    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue)
        const body = bodyBuilderJSON()
        console.log(body)
    }
    function bodyBuilderJSON() {
        return {
            "email": emailInput.value,
            "password": passwordInput.value
        }
    }

})
    
