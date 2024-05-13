
const TOKEN='token'
function getToken(){
    localStorage.getItem(TOKEN)
}
function setToken(token){
    return localStorage.setItem(TOKEN,token)
}
function removeToken(){
    localStorage.removeItem(TOKEN)
}

export {
    setToken,
    getToken,
    removeToken
}