
const MENULIST = 'menuList'
function getMenuList() {
    localStorage.getItem(MENULIST)
}
function setMenuList(menuList) {
    return localStorage.setItem(MENULIST, menuList)
}
function removeMenuList() {
    localStorage.removeItem(MENULIST)
}




export {
    getMenuList,
    setMenuList,
    removeMenuList,
}