import { Component, OnInit } from '@angular/core';
declare let WE: any;
declare var $: any;
@Component({
  selector: 'app-impactwebgl  ',
  templateUrl: './impactwebgl.component.html',
  styleUrls: ['./impactwebgl.component.scss']
})
export class ImpactwebglComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.loadmap();
    $(".card").hover(
      function() {
         $('.multi-collapse').collapse('show');
       }, function() {
         $('.multi-collapse').collapse('hide');
       }
     );

     $('.counter-count').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 1500,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
  });
  }

  loadmap(){
    var earth = new WE.map('earth_div');
    // https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Nw0nPUcMYPVrCOoeOuhc
    // https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Nw0nPUcMYPVrCOoeOuhc
    // https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=Nw0nPUcMYPVrCOoeOuhc
    WE.tileLayer('https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=gCUdxnRK33BfT2h9DWtn').addTo(earth);

    var marker = WE.marker([-10.151093, -75.311132]).addTo(earth);
    marker.bindPopup("<b style='font-size:15px;'>Peru</b><br>Europe<br /><span style='font-size:15px;color:rgb(22, 19, 19)'>2.5 million people volunteered <br/>$812 million in loans disbursed by our partners</span>", {maxWidth: 150, closeButton: false});

    var marker3 = WE.marker([55.585901, -105.750596]).addTo(earth);
    marker3.bindPopup("<b style='font-size:15px;'>Canada</b><br>North America<br /><span style='font-size:15px;color:rgb(22, 19, 19)'>388,000 people reached <br/>$2.4 million in loans disbursed by our partners</span>", {maxWidth: 150, closeButton: false});

    var marker4 = WE.marker([31.0461, 34.8516]).addTo(earth);
    marker4.bindPopup("<b style='font-size:15px;'>Israel</b><br>Asia<br /><span style='font-size:15px;color:rgb(22, 19, 19)'>246,000 people reached<br/>$9.4 million in loans disbursed by our partners</span>", {maxWidth: 150, closeButton: false});

    var marker5 = WE.marker([-41.838875, 171.7799]).addTo(earth);
    marker5.bindPopup("<b style='font-size:15px;'>New Zealand</b><br>Zealandia<br /><span style='font-size:15px;color:rgb(22, 19, 19)'>1.7 million people reached<br/>$65 million in loans disbursed by our partners</span>", {maxWidth: 150, closeButton: false});

    var marker6 = WE.marker([20.595164, 78.963606]).addTo(earth);
    marker6.bindPopup("<b style='font-size:15px;'>India</b><br>Asia<br /><span style='font-size:15px;color:rgb(22, 19, 19)'>1.7 million people reached<br/>$45 million in loans disbursed by our partners</span>", {maxWidth: 150, closeButton: false});

    var marker7 = WE.marker([26.494184, 29.871903]).addTo(earth);
    marker7.bindPopup("<b style='font-size:15px;'>Egypt</b><br>Africa<br /><span style='font-size:15px;color:rgb(22, 19, 19)'>408,000 people reached<br/>$5 million in loans disbursed by our partners</span>", {maxWidth: 150, closeButton: false});

    var marker8 = WE.marker([35.473, -97.5171]).addTo(earth);
    marker8.bindPopup("<b style='font-size:15px;'>Oklahoma</b><br>North America<br /><span style='font-size:15px;color:rgb(22, 19, 19)'>2000 people reached<br/>$200,000 in loans disbursed by our partners</span>", {maxWidth: 150, closeButton: false});

    var marker9 = WE.marker([42.3605, -71.0596]).addTo(earth);
    marker9.bindPopup("<b style='font-size:15px;'>Boston</b><br>North America<br /><span style='font-size:15px;color:rgb(22, 19, 19)'>1000 people reached<br/>$400,000 in loans disbursed by our partners</span>", {maxWidth: 150, closeButton: false});


    var marker2 = WE.marker([28.16324, 2.632388]).addTo(earth);
    marker2.bindPopup("<b style='font-size:15px;'>Algeria</b><br>Africa<br /><span style='font-size:15px;color:rgb(22, 19, 19)'>500,000 people reached<br/>$10 million in loans disbursed by our partners</span>", {maxWidth: 150, closeButton: false});

    earth.setView([34.36, -121.3201010789583], 3);
    
    var before = null;
    requestAnimationFrame(function animate(now) {
            var c = earth.getPosition();
            var elapsed = before? now - before: 0;
            before = now;
            earth.setCenter([c[0], c[1] + 0.1*(elapsed/60)]);
            requestAnimationFrame(animate);
        });
  }

}
