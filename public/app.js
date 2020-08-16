//Navbar links animation
(function styleLink() {
    var btn = document.getElementsByClassName('navbar__link');

    for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener('mouseover', function () {
            var span = this.nextElementSibling;
            span.style.width = 100 + '%';
        });
        btn[i].addEventListener('mouseout', function () {
            var span = this.nextElementSibling;
            span.style.width = 0 + '%';
        });
    }
}());
//I am in your code bitch

//Navbar Sticky animation
(function sticky() {
    var navbar = document.querySelector('.navbar-container');
    var navbarTop = navbar.scrollTop;
    var logo = document.querySelector('.navbar__container-logo');

    window.addEventListener('scroll', stickyNav);

    function stickyNav() {
        if (window.scrollY > navbarTop) {
            navbar.classList.add('animate-navbar');
            document.body.style.paddingTop = 0;
            logo.classList.add('navbar__logo-animate');
        } else {
            navbar.classList.remove('animate-navbar');
            document.body.style.paddingTop = 0;
            logo.classList.remove('navbar__logo-animate');
        }
    }
}());

//accordion scroll animation

(function accordionScroll(){
    window.addEventListener('scroll', function(){
        var accordionOne = document.querySelector('.accordion-one');
        var accordionOneTop = accordionOne.getBoundingClientRect().top;
        var accordionTwo = document.querySelector('.accordion-two');
        var accordionTwoTop = accordionTwo.getBoundingClientRect().top;
        var accordionThree = document.querySelector('.accordion-three');
        var accordionThreeTop = accordionThree.getBoundingClientRect().top
        var windowHeight = window.innerHeight;
      
        
        if (accordionOneTop < windowHeight / 1) {
            accordionOne.classList.add('active-one');
        } else {
            //accordionOne.classList.remove('active-one'); 
        }
        if (accordionTwoTop < windowHeight / 1) {
            accordionTwo.classList.add('active-two');
        } else {
            //accordionTwo.classList.remove('active-two');
        }
        if (accordionThreeTop < windowHeight / 1) {
            accordionThree.classList.add('active-three');
        } else {
            //accordionThree.classList.remove('active-three');
        }
    });
}());

//Signup Modal
(function signupModal() {
    //Open Modal
    var signUpBtn = document.getElementById('signup-btn');
    var signUpModal = document.querySelector('.signup-container');
    var closeModal = document.querySelector('.close-btn');
    var overlay = document.querySelector('.overlay');
    var loginModal = document.querySelector('.login-container');

    signUpBtn.addEventListener('click', function (e) {
        signUpModal.style.display = 'flex';
        overlay.classList.add('open');
        e.preventDefault();
    });

    closeModal.addEventListener('click', function () {
        signUpModal.style.display = 'none';
        overlay.classList.remove('open');
        loginModal.style.display = 'none';
    });

    overlay.addEventListener('click', function () {
        overlay.classList.remove('open');
        signUpModal.style.display = 'none';
    })

    //CloseModal
}());

//Login Modal
(function loginModal() {
    var loginBtn = document.getElementById('login-btn');
    var loginModal = document.querySelector('.login-container');
    var closeModal = document.querySelectorAll('.close-btn');
    var overlay = document.querySelector('.overlay');
    var signUpModal = document.querySelector('.signup-container');
    for (var i = 0; i < closeModal.length; i++) {
        closeModal[i].addEventListener('click', function () {
            loginModal.style.display = 'none';
            overlay.classList.remove('open');
            signUpModal.style.display = 'none';
        });
    }
    loginBtn.addEventListener('click', function (e) {
        loginModal.style.display = 'flex';
        overlay.classList.add('open');
        e.preventDefault();
    })
    overlay.addEventListener('click', function () {
        overlay.classList.remove('open');
        loginModal.style.display = 'none';
    })
}());

//Carousel
(function carousel() {
    var carousel = document.querySelector('.carousel');
    var inner = document.querySelector('.carousel__inner');
    var img = document.querySelectorAll('.carousel__img');
    var next = document.getElementById('carousel__next')
    var prev = document.getElementById('carousel__prev')
    var bulletsContainer = document.querySelector('.bullets-container');
    counter = 0;
    width = 100;
    bulletsArr = [];

    for (var i = 0; i < img.length; i++) {
        var bullets = document.createElement('span');
        bullets.classList.add('bullets');
        bulletsContainer.appendChild(bullets);
        bulletsArr.push(bullets);


    };

    next.addEventListener('click', function () {
        counter++;

        if (counter >= img.length) {
            counter = 0;
        }
        slideCarousel();
    });
    prev.addEventListener('click', function () {
        counter--;

        if (counter < 0) {
            counter = img.length - 1;
        }
        slideCarousel();
    });

    function slideCarousel() {
        inner.style.left = -width * counter + '%';
        bulletsArr.forEach(function (bullets, index) {
     
            bullets.addEventListener('click', function () {
                counter = index;
                slideCarousel();
            });
            if (index === counter) {
                bullets.classList.add('active');
            } else {
                bullets.classList.remove('active');
            }
        });
    }

    slideCarousel();
}());

//accordion
(function accordion() {
    var accordionBtn = document.querySelectorAll('.about__accordion');

    for (var i = 0; i < accordionBtn.length; i++) {
        accordionBtn[i].addEventListener('click', function () {
            var content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    };

}());


//prevent link default

(function preventLinkDefault(){
    var links = document.getElementsByTagName('a');
    for(var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e){
            e.preventDefault();
        });
    };

}());

//dynamic date
(function dynamicDate(){
    var year = new Date().getFullYear();
    var date = `${year}`;
    document.getElementById('dynamicYear').innerHTML = date;
}());


//menu

(function menu(){
    var menuBtn = document.querySelector('.menu');
    var menuOne = document.querySelector('.menu__one');
    var menuNavbar = document.querySelector('.navbar-container');
   
    
    menuBtn.addEventListener('click', function(){
        menuOne.classList.toggle('menu__two');    
        menuNavbar.classList.toggle('navbar-transform');
    });

}());