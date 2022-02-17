const $assetsImg = $("#accordionExample");


const $options = $("#options");
const $select = $(`<select name="asset" class="form-control" id="assetId"></select>`);
const $modalBody = $('#myModal');
let assetsObj = {};

$("#accordionExample").hide();
$("#myInput").on("keyup", function() {
    var value = this.value.toLowerCase().trim();
    $("#accordionExample").show();
    $("#accordionExample .accordion-item h2").show().filter(function() {
      return $(this).text().toLowerCase().trim().indexOf(value) == -1;
    }).hide();
  });

  $("#myCarousel").flexisel({
    visibleItems: 4,
    itemsToScroll: 1,
    animationSpeed: 200,
    infinite: true,
    navigationTargetSelector: null,
    autoPlay: {
        enable: true,
        interval: 1000,
        pauseOnHover: true
    },
    responsiveBreakpoints: { 
        portrait: { 
            changePoint:480,
            visibleItems: 1,
            itemsToScroll: 1
        }, 
        landscape: { 
            changePoint:640,
            visibleItems: 2,
            itemsToScroll: 2
        },
        tablet: { 
            changePoint:768,
            visibleItems: 3,
            itemsToScroll: 3
        }
    },

});

  

//   surge --domain painful-winter.surge.sh .
const assets =  () =>{
 
    $.get('https://api.coincap.io/v2/assets/', (data) =>{
        assetsObj = data;
            console.log(data);
        for (let i = 0; i < 6; i++) {
            // const $div = $('<div></div>');
            let id = data.data[i].id;
            let name = data.data[i].name;
            let link = data.data[i].explorer;
            // const $option = $(`<option value="${id}">${name}</option>`);
            // $select.append($option);
            let symbol = (data.data[i].symbol).toLowerCase();
            symbol === 'bttold'? symbol = 'btt' : symbol;
            // const $img = $('<img class="assetImg">');
            // $img.attr('src', `https://assets.coincap.io/assets/icons/${symbol}@2x.png`);
            // $img.attr('id', id);
            // $div1.attr('href', link);
            // $div1.text(name);
            
            // $div1.append($img);
            
            // $options.append($select);
            // $div.append($div1);
            // $assetsImg.append($div);
            // const $imgSlider = $("#myCarousel");
            // const $li = $('<li></li>');
            // const $img = $(`<img src="https://assets.coincap.io/assets/icons/btc@2x.png" />`);
            // $img.appendTo($li);
            // $li.appendTo($imgSlider);

            $accord = $(`<div class="accordion-item">
                        <h2 class="accordion-header" id="heading${[i]}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${[i]}" aria-expanded="true" aria-controls="collapse${[i]}">
                            ${id.toUpperCase()}
                        </button>
                        </h2>
                        <div id="collapse${[i]}" class="accordion-collapse collapse" aria-labelledby="heading${[i]}" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="card mb-3" style="width: 100%;">
                                <div class="row no-gutters">
                                    <div class="col-md-4" id="image">
                                        <img  src="https://assets.coincap.io/assets/icons/${symbol}@2x.png" class="card-img" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                        <h5 class="card-title">${(id).toUpperCase()}</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div> `);
            $assetsImg.append($accord);
           
        }
           
    });
}

assets();