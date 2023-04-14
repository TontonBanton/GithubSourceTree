$(document).ready(function(){

  $('#menu').click(function(){
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load',function(){
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if($(window).scrollTop() > 68){
       $('header .header-2').addClass('header-active');
    }else{
       $('header .header-2').removeClass('header-active');
    }

    $('section').each(function(){
        let height = $(this).height();
        let offset = $(this).offset().top - 200;
        let top = $(window).scrollTop();
        let id = $(this).attr('id');

        if(top >= offset && top < offset + height){
          $('.navbar ul li a').removeClass('active');
          $('.navbar').find(`[href="#${id}"]`).addClass('active');
        }

    });

  });

  $('.home-slider').owlCarousel({
    items:1,
    nav:true,
    dots:false,
    autoplay:true,
    autoplayTimeout:8000,
    loop:true
  });

  $('.small-image img').click(function(){

    $(this).addClass('image-active').siblings().removeClass('image-active');
    let image = $(this).attr('src');
    $('.big-image img').attr('src', image);

  });


  $('.gallery .btn').click(function(){
    let filter = $(this).attr('data-filter');
    //alert(filter);
      if(filter == 'all'){
          $('.gallery .box').show(400);
      }else{
          $('.gallery .box').not('.'+filter).hide(200);
          $('.gallery .box').filter('.'+filter).show(400);
      }

      $(this).addClass('button-active').siblings().removeClass('button-active');
  });

  async function loadArrivalBoxes() {
    let allBoxes = '';
    let boxes = await $.ajax('/data/boxesarrival.json');      //JSON
    let boxTpl = await $.ajax('/templates/boxarrival.html');  //TEMPLATE
    let arrivalContainer = document.querySelector('.arrival .box-container');
    boxes.forEach((box) => {
      let tpl = boxTpl
        .replace('{{image}}', box.image)
        .replace('{{name}}', box.info.name)
        .replace('{{sale}}', box.info.subinfo.price.sale)
        .replace('{{srp}}', box.info.subinfo.price.srp);
        allBoxes += tpl;
    }); 

    if (allBoxes.length) {
      arrivalContainer.innerHTML = allBoxes;
    }
  }

  async function loadFruits() {
    let allBoxes = '';
    let boxes = await $.ajax('/data/boxesgallery2.json');      //JSON
    let boxTpl = await $.ajax('/templates/boxgallery.html');  //TEMPLATE
    let arrivalContainer = document.querySelector('.gallery .image-container');
    console.log(boxes);   
    console.log(arrivalContainer);  
    boxes.forEach((box) => {
       let tpl = boxTpl
        /*.replace('{{product}}', box.product)
        .replace('{{image}}', box.image)
        .replace('{{name}}', box.info.name)
        .replace('{{sale}}', box.info.subinfo.price.sale)
        .replace('{{srp}}', box.info.subinfo.price.srp);*/
        .replace('{{product}}', box.product)
        .replace('{{image}}', box.image)
        .replace('{{name}}', box.name)
        .replace('{{sale}}', box.sale)
        .replace('{{srp}}', box.srp);
        allBoxes += tpl;
        console.log(allBoxes);
    });

    if (allBoxes.length) {
      arrivalContainer.innerHTML = allBoxes;
    }
  }

  loadArrivalBoxes();
  loadFruits();

  
});

