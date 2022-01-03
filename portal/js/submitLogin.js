
// Sobrescrevendo submit padrão quando a página carregar
$(document).ready(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token')

    if(token)
        window.location.replace("./logado.html");
    $('form').submit(submitLogin)
})


const submitLogin = async function (e) {
    e.preventDefault()
    const dre = $('#dre').val()
    const password = $('#password').val()
    const isSaveCredential = $('#remember').is(':checked')
    
    await login(dre, password, isSaveCredential)
    

}

const login = async (dre, password, isSaveCredential) => {

    try {
        const response = await axios.post('http://localhost:4010/login', {dre, password})

        if(Object.keys(response.data).includes('token')){
            
            if(isSaveCredential)
                localStorage.setItem('token', response.data.token)

            sessionStorage.setItem('token', response.data.token)
            
            axios.defaults.headers = {
                Authorization: `Bearer ${response.data.token}`
            }

            window.location.replace("./logado.html");
        }



    } catch (error) {
        if(error.message === 'Request failed with status code 401'){
            $('#errorLoginMessage').attr("hidden", false)
        }
    }

    
}