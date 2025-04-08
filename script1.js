/*==========TYPE EFFECT=========*/
const typed = document.getElementById('typed');
const typeds = ['Fullstack Developer', '& Electronic engineer'];

function typeEffect(element, phrases, speed = 100, delayBetweenPhrases = 1500) {
  let Iphrase = 0;
  let charI = 0;
  let currentPhrase = '';

  function type() {
    if (Iphrase < phrases.length) {
      currentPhrase = phrases[Iphrase];
      if (charI < currentPhrase.length) {
        element.textContent += currentPhrase.charAt(charI);
        charI++;
        setTimeout(type, speed);
      } else {
        // Phrase actuelle terminée, attendre un délai puis passer à la suivante
        setTimeout(startNextPhrase, delayBetweenPhrases);
        Iphrase++; //incrementer pour la boucle
      }
    } else {
      // Toutes les phrases ont été affichées (vous pouvez ajouter une logique pour répéter si nécessaire)
     Iphrase = 0;
     setTimeout(startNextPhrase, delayBetweenPhrases);
    }
  }

  function startNextPhrase() {
    charI = 0;
    element.textContent = ''; // Efface l'élément avant de taper la nouvelle phrase
    type();
  }

  // Démarrer l'effet avec la première phrase
  type();

}

typeEffect(typed, typeds, 100, 1000);


/*============SOFT SKILLS==============*/
//Radial bar
document.addEventListener("DOMContentLoaded", () =>{
  const radialBar = document.querySelectorAll(".progress-container");
  
  radialBar.forEach(container => {
   const circle = container.querySelector(".progress-ring__circle");
   const text = container.querySelector(".progress-text");
   const targetProgress = container.getAttribute("data-progress");

   const radius = circle.r.baseVal.value;
   const circumference = 2* Math.PI * radius;

   circle.style.strokeDasharray = circumference;
   circle.style.strokeDashoffset = circumference;

   function setProgress(percent){
    const offset = circumference - (percent/100) * circumference;
    circle.style.strokeDashoffset = offset;
    text.textContent = `${percent}%`;
   }

    let progress = 0;
    const interval = setInterval(() =>{
     if (progress >= targetProgress){
       clearInterval(interval);
     } else{
      progress += 1;
      setProgress(progress);
     }


    }, 30);

  });


});

/*=================ACCORDION SKILLS=================*/

 const skillsContent = document.getElementsByClassName("skills_content");
 const skillsHeader = document.querySelectorAll('.skills_header');

function toggleSkills(){
   
  let itemClass = this.parentNode.className;

  for(i=0; i < skillsContent.length; i++){
    skillsContent[i].className = 'skills_content skills_close';
  }
  if( itemClass === 'skills_content skills_close' ){
    this.parentNode.className = 'skills_content skills_open';
  }

}

skillsHeader.forEach((el) =>{ 
  el.addEventListener('click', toggleSkills);
})

/*========================PORTFOLIO SWIPER AVEC EFFET========================*/
const portfolioSwiper = new Swiper('.portfolio_container', {
  effect: 'coverflow', // Ajout de l'effet flip
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 30,

  coverflowEffect: {
    //slideShadows: true, // Ajoute des ombres lors du flip
    rotate: 30,
    depth: 100,
    modifier: 1,
  },

   // Affiche 1 projet à la fois (mobile)
  spaceBetween: 10, // Espacement entre les diapositives
  pagination: {
    el: '.portfolio-pagination', // Pagination spécifique au Swiper du portfolio
    clickable: true,
  },
  navigation: {
    nextEl: '.portfolio-button-next', // Bouton de navigation suivant spécifique au Swiper du portfolio
    prevEl: '.portfolio-button-prev', // Bouton de navigation précédent spécifique au Swiper du portfolio
  },
  
  breakpoints:{
    0:{
      slidesPerView: 1,
      coverflowEffect: {
        rotate: 0,
        depth: 0,
        stretch: 0,
        slideShadows: false,
        modifier: 0,
      }
       
    },
    768:{
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 30,
        depth: 100,
        stretch: 0,
        slideShadows: true,
        modifier: 1,
      }
    }
  },

  }
); 

window.addEventListener('resize', function(){
  if (this.window.innerWidth<= 768){
    portfolioSwiper.params.coverflowEffect.slideShadows = false;
    portfolioSwiper.update();
  }else{
    portfolioSwiper.params.coverflowEffect.slideShadows = true;
    portfolioSwiper.update();
  }
});




/*================PORTFOLIO MODAL SWIPER=============*/
const modalViews = document.querySelectorAll('.work_modal'),
      modalBtns = document.querySelectorAll('.work_button'),
      modalCloses = document.querySelectorAll('.work_modal-close');

let modal = function(modalClick){
        modalViews[modalClick].classList.add('active-modal'); 
        // Initialiser Swiper pour ce modal spécifique
        const swiper = new Swiper(modalViews[modalClick].querySelector('.work-swiper'), {
    
          navigation: {
            nextEl: '.modal-button-next',
            prevEl: '.modal-button-prev',
          },
          pagination: {
            el: '.modal-pagination',
            clickable: true,
          },
          mousewheel: true,
          keyboard: true,
          slidesPerView: 1,
        });
      
        setTimeout(()=>{
          swiper.update();
          swiper.slideTo(0);
        }, 100);
      }
     
modalBtns.forEach((modalBtn, i)=>{
   modalBtn.addEventListener('click', ()=>{
    modal(i); //ouvre le modal et initialise swiper
   });
} );

modalCloses.forEach((modalClose) =>{
  modalClose.addEventListener('click', ()=>{
    modalViews.forEach((modalView)=>{
      modalView.classList.remove('active-modal'); //ferme le modal
    });
  });
});

/*================= QUALIFICATION TABS==============*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab =>{
  tab.addEventListener('click', ()=>{
     const target = document.querySelector(tab.dataset.target);

     tabContents.forEach(tabContent =>{
       tabContent.classList.remove('qualification_active');
     });
     target.classList.add('qualification_active');
     tab.forEach(tab =>{
       tab.classList.remove('qualification_active');
     });
     tab.classList.add('qualification_active');
  });
});

const tabIcon = document.querySelectorAll('.qualification_button');

tabIcon.forEach(icon =>{
  icon.addEventListener('click', ()=>{
    tabIcon.forEach(i => i.classList.remove('active-tab'));
    icon.classList.add('active-tab');
  });
});


/*===============SCROLL SECTION ACTIVE LINK================*/
const sections= document.querySelectorAll('section[id]')

 function scrollActive(){
   const scrollY = window.pageYOffset;

   sections.forEach(current =>{
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      sectionId = current.getAttribute('id');

      if( scrollY> sectionTop && scrollY <= sectionTop + sectionHeight){
        document.querySelector('.nav_menu a[href*=' + sectionId+']').classList.add('active-link');
      } else{
        document.querySelector('.nav_menu a[href*=' + sectionId+ ']').classList.remove('active-link');
      }
  
  });

 }

 window.addEventListener('scroll', scrollActive);
 
/*======= SHOW SCROLL UP=========*/
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  //When scroll is higher than 560
  if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}

window.addEventListener('scroll', scrollUp);

/*======DARK LIGHT THEME=========*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun'; 

//previously selected topic (if userselected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

//We obtain the current themethat the interface has by validating the dark-theme class
const getCurrentTheme =() => document.body.classList.contains(darkTheme)? 'dark': 'light';
const getCurrentIcon =() => themeButton.classList.contains(iconTheme)? 'bx-moon': 'bx-sun';

//We validate if the user previously choose a topic
if(selectedTheme){
  //if the validation is fullfilled, we ask what the issue was to know if we activate or desactivate the dark theme
  document.body.classList[selectedTheme === 'dark'? 'add': 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'bx-moon'?'add': 'remove'](iconTheme);
}

//activate or desactivate manually with the button
themeButton.addEventListener('click', ()=>{
  //add or remove the dark icon
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  //save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());

})

/*================= ANIMATION AU SCROLL================*/
 /*=======Titre de section =====*/

 document.addEventListener('DOMContentLoaded', () => {
  const sectionTitles = document.querySelectorAll('.section_title');
  

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const titleObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else{
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  sectionTitles.forEach(title => {
    titleObserver.observe(title);
  });
});



/*======== BLOB =======*/ 
document.addEventListener('DOMContentLoaded', ()=>{
  const blobs = document.querySelector('.home_img');

    const options ={
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

   const blobObserver = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry =>{
      if(entry.isIntersecting){
        entry.target.classList.add('vue');
        observer.unobserve(entry.target);
      }
    });
   }, options);

   blobObserver.observe(blobs);

});
    
   



 



       









 
  




      



 

  
    




















