(function() {
  'use strict';

  angular
      .module('pogodno')
      .service('webDevTec', webDevTec);


  /** @ngInject */
  function webDevTec() {

    var data = [
     {
      "title": "Totemy dla zastępów ze Skautingu dla Chłopców",
      "vol": 1,
      "articles": [
        {
          "author": "Kasia Lubiejewska",
          "title": "Hufiec - nasz drugi dom"
        },
        {
          "author": "Poczta Harcerska Szczecin III",
          "title": "wywiad z jej Naczelnikiem i sondaż"
        },
        {
          "author": "Robert Baden-Powell",
          "title": "wskazówki dla instruktorów"
        },
        {
          "author": "Nieznany",
          "title": "Chorągwiany biwak WRON - wrażenia na gorąco"
        },
        {
          "author": [
            "Leszek Kaczanowski",
            "Maciej Uciechowski"
          ],
          "title": "O Komisji Kształcenia i Stopni - Szermierka"
        },
        {
          "author": "Nieznany",
          "title": "Gród Sediny - reportaż z budowy i rozmowa z prezesem spółdzielni - Józefem Kalinowskim"
        },
        {
          "author": [
            "Michał Borun",
            "Roman Proszkowski"
          ],
          "title": "Globtroter - Norwegia 1996"
        }
      ],
      "url": "https://angularjs.org/",
      "description": "description for vol. 01",
      "logo": "magazine/01.jpg",
      "reviews": [
        {
          "pseudonim": "Krzysiek",
          "context": "komentarz1(1obj)",
          "grade": 1,
          "mail": "blabla1@gmail.com",
          "subcribe" : true
        },
        {
          "pseudonim": "Maciej",
          "context": "komentarz2(1obj)",
          "grade": 2,
          "mail": "blabla2@gmail.com",
          "subcribe" : false
        },
        {
          "pseudonim": "Arek",
          "context": "komentarz3(1obj)",
          "grade": 3,
          "mail": "blabla3@gmail.com",
          "subcribe" : true
        }
      ]
    },   
     {
      "title": "Zdecydowanie cos innego",
      "vol": 2,
      "articles": [
        {
          "author": "Kasia Lubiejewska",
          "title": "Hufiec - nasz drugi dom"
        },
        {
          "author": "Poczta Harcerska Szczecin III",
          "title": "wywiad z jej Naczelnikiem i sondaż"
        },
        {
          "author": "Robert Baden-Powell",
          "title": "wskazówki dla instruktorów"
        },
        {
          "author": "Nieznany",
          "title": "Chorągwiany biwak WRON - wrażenia na gorąco"
        },
        {
          "author": [
            "Leszek Kaczanowski",
            "Maciej Uciechowski"
          ],
          "title": "O Komisji Kształcenia i Stopni - Szermierka"
        },
        {
          "author": "Nieznany",
          "title": "Gród Sediny - reportaż z budowy i rozmowa z prezesem spółdzielni - Józefem Kalinowskim"
        },
        {
          "author": [
            "Michał Borun",
            "Roman Proszkowski"
          ],
          "title": "Globtroter - Norwegia 1996"
        }
      ],
      "url": "https://angularjs.org/",
      "description": "description for vol. 01",
      "logo": "magazine/01.jpg",
      "reviews": [
        {
          "pseudonim": "Krzysiek",
          "context": "komentarz1(2obj)",
          "grade": 1,
          "mail": "blabla1@gmail.com"
        },
        {
          "pseudonim": "Maciej",
          "context": "komentarz2(2obj)",
          "grade": 2,
          "mail": "blabla2@gmail.com"
        },
        {
          "pseudonim": "Arek",
          "context": "komentarz3(2obj)",
          "grade": 3,
          "mail": "blabla3@gmail.com"
        }
      ]
    } 
    ];

    var activeThing = {}; 

    this.getTec = getTec;
    this.setTec = setTec;
    this.getActiveThing = getActiveThing;
    this.setActiveThing = setActiveThing;

    function getTec() {
      return data;
    }

    function setTec(element,location) {
      data.location.push(element);
    }

    function getActiveThing() {
      return activeThing;
    }

    function setActiveThing(element) {
      activeThing = element;
    }
  }

})();
