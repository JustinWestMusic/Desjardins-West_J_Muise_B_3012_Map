(function(){
    
     var map = new google.maps.Map(document.querySelector('.map-wrapper'), 
     {
            zoom : 13,
            maxZoom: 16,
            minZoom: 4
    });
        var preloader = document.querySelector('.preload-wrapper'),
        //import the geocode API
        geocoder = new google.maps.Geocoder(),
        geocodeButton = document.querySelector('.geocode'),
        
        //directions idsplay
        directionsService = new google.maps.DirectionsService(),
        directionsDisplay,
        locations = [],
        
        marker;
    
    function initMap(position)
    {
        //save our location
        locations[0] = {lat: 44.50003, lng: -81.373050};
        
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        
        map.setCenter({lat: 44.50003, lng: -81.373050});
                
        marker = new google.maps.Marker
        ({
            position: {lat: 44.50003, lng: -81.373050},
            map: map,
            title: "Chantry Island"
        });
            contentString = '<div id="content">'+'<h2 id="infoTitle">Chantry Island Tour Base</h2>'+'<p>86 Saugeen St, Southampton<br>ON N0H 2L0</p>'+'</div>';
        
        infowindow = new google.maps.InfoWindow
        ({
          content: contentString
        });

        marker.addListener('click', function()
        {
            infowindow.open(map, marker);
        });
            preloader.classList.add('hide-preloader');
    }
    
    
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(initMap, handleError);
    }
    else
    {
        //console.log("nope!");
    }
    
    function handleError()
    {
        //console.log("HAHA");
    }
    
    function codeAddress()
    {
        var address = document.querySelector('.address').value;
        
        geocoder.geocode({'address': address}, function(results, status)
        {
            if(status == google.maps.GeocoderStatus.OK){
                //push location into array
                locations[1] = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                };
                
                map.setCenter(results[0].geometry.location);
                
                if(marker)
                {
                    marker.setMap(null);
                    
                    marker = new google.maps.Marker
                    ({
                        map: map,
                        position: results[0].geometry.location
                    });
                    calcRoute(results[0].geometry.location);
                }
                else
                {
                    console.log('Geocode was not successful for the following reason:', status);
                }
            }
        });
    }
    
    function calcRoute(codedLoc)
    {
        var request = 
        {
            origin: locations[0],
            destination: locations[1],
            travelMode: 'DRIVING'
        };
        
        directionsService.route(request,function(response, status)
        {
            if(status == 'OK')
            {
                directionsDisplay.setDirections(response);
            }
        });
    }
    
    geocodeButton.addEventListener('click', codeAddress, false);
    
})();

/*Latitude, Longitude: (45.1510532655634, -79.398193359375)
-81.373050
44.50003*/