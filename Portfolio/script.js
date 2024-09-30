let icon = document.getElementById('icon')


icon.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme')

    if(document.body.classList.contains('dark-theme')){
        icon.src = "moon.png"
    }
    else{
        icon.src="sun.png"
    }

})

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
