const $assetsImg = $("#accordionExample");
const $options = $("#options");
const $select = $(`<select name="asset" class="form-control" id="assetId"></select>`);
const $modalBody = $('#myModal');
let assetsObj = {};

// accordion
// $("#accordionExample").hide();
$("#myInput").on("keyup", function() {
    var value = this.value.toLowerCase().trim();
    $("#accordionExample").show();
    $("#accordionExample .accordion-item h2").show().filter(function() {
      return $(this).text().toLowerCase().trim().indexOf(value) == -1;
    }).hide();
  });

// formatter
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

// flexisel
  $("#myCarousel").flexisel({
    visibleItems: 4,
    itemsToScroll: 1,
    animationSpeed: 200,
    infinite: true,
    navigationTargetSelector: null,
    autoPlay: {
        enable: true,
        interval: 5000,
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

// accordion creation 

const assets =  () =>{
 
    $.get('https://api.coincap.io/v2/assets/', (data) =>{
        assetsObj = data;
            console.log(data);
        for (let i = 0; i < data.data.length; i++) {
            let id = data.data[i].id;
            let link = data.data[i].explorer;
            let name = data.data[i].name;
            let marketCap = formatter.format(parseFloat(data.data[i].marketCapUsd).toFixed(2));
            let maxSupply = data.data[i].maxSupply;
            let price = formatter.format(parseFloat(data.data[i].priceUsd).toFixed(2));
            let rank = data.data[i].rank;
            let volume = data.data[i].volumeUsd24Hr;
            let change = parseFloat(data.data[i].changePercent24Hr).toFixed(2);

            let symbol = (data.data[i].symbol).toLowerCase();
            symbol === 'bttold'? symbol = 'btt' : symbol;
            symbol === 'bttold'? symbol = 'btt' : symbol;
            change>0? color='green':color="red";

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
                                    <a href="${link}"> <img  src="https://assets.coincap.io/assets/icons/${symbol}@2x.png" class="card-img" alt="..."></a>
                                        
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                <th>Price</th>
                                                    <td>${price}</td>
                                                </tr>
                                                <tr>
                                                <th>24hr Change</th>
                                                    <td style="color:${color};">${change}%</td>
                                                </tr>
                                                <tr>
                                                <tr>
                                                <th>Rank</th>
                                                    <td>${rank}</td>
                                                </tr>
                                                <tr>
                                                <th>Market Cap</th>
                                                    <td>${marketCap}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <a href="${link}" class="btn btn-primary">More info on ${name}</a>
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