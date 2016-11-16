var verizonQuickView = (function () {
  var $closeBtn,
      $modalContainer,
      $modalBg,
      $phoneLinkElements,
      $modalPhoneImage,
      $modalDeviceName,
      $modalPhonePrice,
      $modalPhonePriceDesc,
      $modalTechSpecsContainer,
      $modalMoreDetailsBtn,
      $modalAddToCartBtn,
      $loadingImg,
      getPhoneData = function (skuString) {
        $modalTechSpecsContainer.html('');
        $loadingImg.show();
        $.ajax({
            url: 'https://www.verizonwireless.com/postpayservices/model/com/vzw/rest/browse/DeviceDetailsActor/techSpecAndFeaturesRecommendations',
            dataType: 'json',
            data: { 'deviceSkuId': skuString },
            success: function (data) {
              $loadingImg.hide();
              for (var i = 0; i < data.techSpecs.techSpecs.length; i++) {
                if (data.techSpecs.techSpecs[i].attributeKey === 'Standby Time - Up to:' || data.techSpecs.techSpecs[i].attributeKey === 'Usage Time - Up to:' || data.techSpecs.techSpecs[i].attributeKey === 'Camera' || data.techSpecs.techSpecs[i].attributeKey === 'Weight' || data.techSpecs.techSpecs[i].attributeKey === 'Screen'|| data.techSpecs.techSpecs[i].attributeKey === 'Operating System' || data.techSpecs.techSpecs[i].attributeKey === 'Storage') {
                  $modalTechSpecsContainer.append('<li>'+ '<span class="tsLabel">' + data.techSpecs.techSpecs[i].attributeKey + '</span> ' + data.techSpecs.techSpecs[i].attributeValue + '</li>');
                }
              }
            },
            type: 'GET' 
        });
      },
      closeModal = function (e) {
          e.preventDefault();
          $modalBg.hide();
          render({},true);
          $modalContainer.hide();
          $loadingImg.show();
          $modalTechSpecsContainer.html('');
          return true;
      },
      openModal = function () {
          var device = $(this);
          var config = {
            sku: device.attr('data-skuid'),
            deviceImgUrl: device.find('.gridwallTile_image').attr('src')+'&hei=425',
            moreDetailURL: 'https://www.verizonwireless.com'+device.find('h6.gridwallTile_deviceName a').attr('href'),
            deviceName: device.find('h6.gridwallTile_deviceName a').html(),
            devicePrice: device.find('.fontSize_6').html(),
            devicePriceDescription: device.find('.gridwallTile_descp span').html()
          };
          $modalBg.show();
          render(config, false);
          $modalContainer.show();
          return true;
      },
      bindUIEvents = function () {
        $closeBtn.on('click', closeModal);
        $modalBg.on('click', closeModal);
        $modalAddToCartBtn.on('click', closeModal);
        $phoneLinkElements.on('click', openModal);

      },
      cacheDOM = function () {
        $modalContainer = $('#vApplication');
        $modalBg = $('#moduleBackground');
        $loadingImg = $modalContainer.find('#loading-img');
        $closeBtn = $modalContainer.find('#closeBtn');
        $modalDeviceName = $modalContainer.find('#phoneName');
        $modalPhoneImage = $modalContainer.find('#phoneImage');
        $modalPhonePrice = $modalContainer.find('#phonePrice');
        $modalPhonePriceDesc = $modalContainer.find('#phonePriceDetail');
        $modalTechSpecsContainer = $modalContainer.find('#summaryList');
        $modalMoreDetailsBtn = $modalContainer.find('#viewDetails');
        $modalAddToCartBtn = $modalContainer.find('#addToCart');
        $phoneLinkElements = $('.gridwallTile');
      },
      render = function (config, clear) {
        
        if (!clear) {
          getPhoneData(config.sku);
        };
        
        $modalPhoneImage.attr('src',  (clear ? '' : config.deviceImgUrl) );
        $modalMoreDetailsBtn.attr('href',  (clear ? '' : config.moreDetailURL) );
        $modalDeviceName.html( (clear ? '' : config.deviceName) );
        $modalPhonePrice.html( (clear ? '' : config.devicePrice) );
        $modalPhonePriceDesc.html( (clear ? '' : config.devicePriceDescription) );
      },
      init = function () {
        cacheDOM ();
        bindUIEvents();
      };
  return {
    init: init,
    close: closeModal
  }
})();
verizonQuickView.init();
