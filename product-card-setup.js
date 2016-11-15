//setup page
var PageSetup = {
  loadStyleSheets: function () {
    //load the css
    $('<link />', {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans|Source+Sans+Pro'
    }).appendTo("head");
    $('<link />', {
        rel: 'stylesheet',
        href: 'https://rawgithub.com/jrdesignhero/jrdesignhero-product-card/master/product-card.css'
    }).appendTo("head");    
  },
  loadScripts: function () {
    $('<script>', {
      type: 'text/javascript',
      src: 'https://rawgithub.com/jrdesignhero/jrdesignhero-product-card/master/product-card.js'
    }).appendTo("body");    
  },
  appendHTML: function () {
    //append the html elements that make up modal
    var productCardHTML = '<div id="moduleBackground" style="display: none"></div><div id="vApplication" class="reset"><span id="closeBtn">x</span><div id="verizonPhoneDetail"><img id="phoneImage" class="block" /></div><div id="verizonQuickView"><h1 id="phoneName"></h1><div id="starRating"></div><h2 id="summaryTitle">Technical Specs:</h2><img src="http://www.jrdesignhero.com/apps/verizon-project/loading.gif" id="loading-img" /><ul id="summaryList"></ul><h3 id="phonePrice"></h3><p id="phonePriceDetail"></p><a href="#" id="addToCart" class="btn">Add to Cart</a><a href="#" target="_blank" id="viewDetails" class="btn">View More Details</a></div></div>';
    $('body').append(productCardHTML);
  },
  bindUIActions: function () {
    //remove click eventlistener from phones
    $('.gridwallTile_wrapper').off();
  },
  render: function () {
    PageSetup.loadStyleSheets();
    PageSetup.loadScripts();
    PageSetup.appendHTML();
  },
  init: function () {
    this.bindUIActions();
    this.render();
  }
};
PageSetup.init();