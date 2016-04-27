(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($route, $q, toastr, internalDb, IssuuFactory, $location, $anchorScroll, $scope, $compile, $routeParams, firebaseUrl, $firebaseArray, Firebase) {
    
    var vm = this;
    vm.data = IssuuFactory.doStuff();
    internalDb.setTotalNumPage(vm.data.rsp._content.result.totalCount);

    
    var ref = new Firebase(firebaseUrl);

    vm.totalNumPages = internalDb.getTotalNumPage();

    vm.hashValue = $routeParams.filter;
    vm.showHeader = true;
    vm.login = login;
    vm.activeThing = '';
    vm.addReview = addReview;
    vm.hideJumbo = hideJumbo;
    vm.showJumbo = false;
    vm.isActive = isActive;

    vm.allDoc = vm.data.rsp._content.result._content;

    vm.go = go;
    vm.awesomeThingCurrent;

    vm.currentPage = internalDb.getPage();
    
    vm.pageSize = vm.data.rsp._content.result.pageSize;
    vm.pageChangeHandler = pageChangeHandler;
    vm.changePagin = changePagin;
    vm.itemsPerPage = 6;

    function pageChangeHandler(num) {
        internalDb.setPage(num);
    }

    function login(){
        vm.dataLoading = true;
          ref.authWithPassword({
          email    : vm.username,
          password : vm.password
        }, function(error) {    // authData param
          if (error) {
            toastr.error('Oj... Coś poszło nie tak.');
            vm.dataLoading = false;
          } else {
            toastr.success('Pomyślna próba zalogowania!');
            $location.path('/');
          }
        });
    }


////// Data to save on firebase ///////////////////////////////
    var coverCuriosities = [
        { "coverCuriosities" :"Totemy dla zastępów ze 'Skautingu dla Chłopców'",
          "posts" : [
            "\"Hufiec - nasz drugi dom\" - Kasia Lubiejewska",
            "\"Poczta Harcerska Szczecin III\" wywiad z jej Naczelnikiem i sondaż",
            "\"Skauting dla chłopców\" rozdz. X - wskazówki dla instruktorów - Robert Baden-Powell",
            "\"Chorągwiany biwak WRON\" - wrażenia na gorąco",
            "\"O Komisji Kształcenia i Stopni\" Leszek Kaczanowski vs. Maciej Uciechowski w dziale Szermierka",
            "\"Gród Sediny\" - reportaż z budowy i rozmowa z prezesem spółdzielni - Józefem Kalinowskim",
            "\"Globtroter - Norwegia 1996\" - Michał Borun, Roman Proszkowski"
          ]
        },
        { "coverCuriosities" :"Nogi Sharon Stone",
          "posts" : [
            "\"Staszoharcerski Klub Wędrowniczy Vita Brevis\" - Filip Lewandowski, Tomasz Maksymiuk",
            "\"Skauting dla chłopców\". Rozdział I (wybór) - Robert Baden-Powell",
            "\"Po-Watrowe refleksje komendantki\" - Magda Jesione \"Rajd Ludzi Lekko Głupawych\" - Leszek Kaczanowski, Paweł Maciaszek",
            "\"Biblioteczka z włoskiego orzecha\" - Grażyna Górkiewicz",
            "\"Wymarzona kolonia zuchowa\" - Anna Stachowska",
            "\"...gdzieś około 54 równoleżnika...\" - Tomasz Maksymiuk",
            "\"O krwi i nie tylko\" - Katarzyna Grabowska",
            "\"Pod Arsenałem\" - Mariusz Cyrulewski",
            "Przestarzałe narzędzia",
            "Mariusz Cyrulewski vs. Filip Lewandowski w dziale Szermierka",
            "\"O zlocie, harcerzach i nie tylko słów parę\" - Magda Jesionek",
            "\"08.03.1997 AD Czyli Dzień Kobiet w 108 DSH\" - Marcin Czubkowski"
          ]
        },
        { "coverCuriosities" : undefined,
          "posts" : [
            "Klub - W odpowiedzi na - Tomasz Maksymiuk przedstawia suplement do prezentacji klubu",
            "\"Ballada o Sosnowej Szyszce\" - Lidia Kmiecik-Zieleniak na jubileuszową nutę",
            "\"Przeprowadzka\" - Magdalena Jesionek na gorąco ('94) o zmianie lokalu",
            "\"Gdzie sens?\" - odpowiedź na \"Przestarzałe narzędzia\"",
            "\"Myśli i rozważania po Rajdzie Pogranicza\" Sebastian Kubacki, Paweł Staniszewski, Krzysztof Nowak w dziale Szermierka",
            "Historia Rajdu Pogranicza w dziale Odkurzone",
            "\"Trzy rzeczy o kształceniu\" - Magda Jesionek o kursie drużynowych",
            "Kurs Zastępowych Watra III - watrowe wspomnienia",
            "\"Norge - historia przygody\" - o rozległej wyżynie Rogalandu",
            "\"40 stopni w cieniu\" - Paweł Maciaszek o podróży do Hiszpanii"
          ]
        },
        { "coverCuriosities" : undefined,
          "posts" : [
            "\"Skauting dla chłopców\" - Robert Baden-Powell - rozdz. II \"Obozowanie\" (wybór)",
            "\"Niecodzienna Służba-PCK\" - Sławomir Kaczyński z Hufca Ziemi Łomżyńskiej o akcji krwiodawstwa",
            "\"Kilka scenek z życia harcerzy\" - w dziale szermierka",
            "\"Powódź - tj. tekst spowodowany\" - Michał Borun przedstawia swój głos w sprawie 10. punktu Prawa Harcerskiego",
            "\"Smrud\" - o europejskich skautach",
            "\"Lipowy rajd\" - Paweł Maciaszek w niekoniecznie obiektywnej relacji",
            "\"WYR.KO\" - antologia zdań wyrwanych z kontekstu",
            "\"Jestem dobry\" - czyli z kim rywalizować?",
            "\"ON\" - Arkariusz Bojarun - przedruk z Harcerza Pomorskiego",
            "\"Mam problem\" - Marek Burko o problemach ustępującego komendanta",
            "Crazy people from 108",
            "\"Żeński Hufiec Pogodno\" - Anna Stachowska o żeńskiej kolonii zuchowej w Milówce"
          ]
        },
        { "coverCuriosities" :"Sałatka.exe",
          "posts" : [
            "\"Skauting dla chłopców\". Rozdz. IX Patriotyzm. - Robert Baden-Powell",
            "\"Kącik Sanitariusza\" - Maja Marciniak",
            "Pogranicze Rozpaczy",
            "Warsztaty dziennikarskie",
            "Osówisko",
            "\"Żydzi\" - teksty Szymona Słueckiego",
            "Krucjata",
            "Requiem",
            "Opowiadanie z cyklu: niesamowite historie",
            "Pamiętnik Jamesa Bonda"
          ]
        },
        { "coverCuriosities" : "Miejsca opuszczone przez środowiska starszoharcerskie hufca",
          "posts" : [
            "\"Skauting dla chłopców\". Rozdział VII: Rycerskość - Robert Baden-Powell",
            "\"Kącik sanitariusza cz.2\"- Maja Marciniak o tym jak uczyć samarytanki",
            "\"Festyn Tacy Sami\" - Edyta Siwińska o festynie",
            "\"Au Pair? Oh yeah!\" - Aleksandra Geniusz z relacją z Hamburga",
            "\"Czy zasługujemy na ich miłość?\" - o psach, pieskach i psinach - Maja Marciniak",
            "\"Kurs 'Grati' Grodno 1998\" - o kursie dla młodych kadr na Białorusi - Edyta Siwińska",
            "\"Kominek bereżnicki\" w dziale Galeria."
          ]
        },
        { "coverCuriosities" :"Ścieżkami zdrowia",
          "posts" : [
            "\"Skauting dla chłopców\". Rozdział VIII: Ratownictwo - Robert Baden-Powell",
            "\"HGR Pomorze\" - Mariusz Cyrulewski o najprężniejszym środowisku starszoharcerskim hufca",
            "\"Strategia rozwoju ZHP\" - wyciąg z dokumentu",
            "\"W pogodni za kubkiem od kawy\" o hufcowym wdrażaniu strategii",
            "\"Konstelacja Wędrownika\" - Michał Borun o autorytetach",
            "\"Wolność... zrozumieć\" - Roman Proszkowski o wolności",
            "\"Człowiek to rzeczownik...\" Michał Borun, Aleksandra Geniusz o ubiegłorocznym koncercie Offspringa",
            "\"Norge - historia przygody\" - odcinek o autostopowaniu",
            "\"trzecia psychologia\" - istota samorealizacji wg A. Maslova",
            "\"O wampirach\" - Ku przestrodze",
            "\"Olbrzym z Bieszczadu\" - z bieszczadzkich legend",
            "\"Korczak na nowe tysiąclecie\" - projekty kopert",
            "M&M's - Michał dla Marty",
            "\"Niech nas znają z dobrej strony\" - dodatek specjalny o Internecie"
          ]
        },
        { "coverCuriosities" :"Prace nad Statutem",
          "posts" : [
            "\"Pierwsi po Bogu\" - o pracy drużynowego z rodzicami",
            "\"Relacja z warsztatów HSI w Koszalinie\" - Marta Mużyło",
            "\"HaeRzy, kwiat młodzieży...\" - internetowa dyskusja z maja 2000",
            "\"Zaje...Pogodno\" - Michał Borun o biwaku programowym w Miroszewie",
            "\"Bo wszyscy harcerze to...\" - Grzegorz Kułakowski o tym jak traktujemy tych, co wybrali inną drogę",
            "\"Bramobudowanie\" - Tomasz Maksymiuk o bramach zlotowych Gniezna",
            "\"Chałupy Welcome to!\" - korespondencje Łukasza Powroziewicza z Afryki"
          ]
        },
        { "coverCuriosities" :"Jestem harcerką!",
          "posts" : [
            "\"Gawęda o Krzyżu Harcerskim i patriotyzmie\" - O. Robert Wawrzeniecki OMI",
            "\"Skauting dla Chłopców\" Rozdział II (wybór) - Robert Baden-Powell",
            "\"Rodzice - pierwsi po Bogu\" - Michał Borun",
            "\"HaeRzy, kwiat młodzieży, harcerscy alumni...",
            "Filip Lewandowski va Anita Regucka-Kwaśnik w dziale Szermierka - przedruk z exe vol. 8",
            "\"Letnia Akcja Szkoleniowa 2001\" - Jacek Drożdżal ca. Inga Rudzin w dziale Szermierka",
            "\"Bramobudowanie\" - Tomasz Maksymiuk o Zlocie w Gnieźnie - przedruk z exe vol. 8",
            "\"Fenomen exe\" - Michał Borun o początkach czasopisma hufca",
            "\"Paweł Maciaszek\" Cucarachas enojadas vs. Vanitas vanitatum - przeduk z exe vol. 4",
            "\"Antologia zdań wyrwanych z kontekstu\" - wypowiedzi uczestników zlotu hufca w Miroszewie w 1997 r. - przedruk z exe vol. 4",
            "\"Listy z Afryki\" - Łukasz Powroziewicz - przedruk z exe vol. 8",
            "\"Jestem dobry?! - czyli z kim rywalizować? - przedruk z \"Harcerza Pomorskiego\" - lata 90.",
            "\"On\" - Arkadiusz Bojarun - przedruk z \"Harcerza Pomorskiego\" - lata 90."
          ]
        },
        { "coverCuriosities" :"A jednak się kręci (pogodno.exe)",
          "posts" : [
            "\"Skauting dla chłopców\" Rozdział I (wybór) - Robert Baden-Powell (przedruk z exe vol.2)",
            "\"Jeśli kurs zastępowych, to w hufcu\" - Agnieszka Kołodziejczyk",
            "\"Odpowiedzialność cywilna za czyny popełnione przez podopiecznych\" - Maciej Grabowski",
            "\"Gawęda o Korczaku\" - autor nam nieznany",
            "\"Wolontariat bez granic\" - Paweł Królik",
            "Prezentacje: hm. Adrian Łaskarzewski - wywiad przeprowadzony przez Katarzynę Czerniawską",
            "Prezentacje: Poczta Harcerska Szczecin III (przedruk z exe vol.1), Klub Wędrowniczy \"Vita Brevis\" (przedruk z exe. wol. 2)",
            "Harcerska Grupa Ratownicza (przedruk z exe vol. 7)",
            "Haerzy, kwiat młodzieży, harcerscy alumni",
            "Filip Lewandowski vs. Anita Regucka-Kwaśnik w dziale Szermierka (przedruk z exe vol. 8)",
            "\"Na pograniczu rozpaczy\" - Michał Borun",
            "\"Harcerstwo dziś\" - Katarzyna Czerniawska",
            "\"Podróż za wschodnią granicę/Podróże kształcą\" - Edyta Siwińska, Krzysztof Kowalczyk",
            "\"Nasz wewnętrzne bogactwo - Ogień\" - Katarzyna Czerniawska",
            "\"Jestem dobry? - czyli z kim rywalizować\" - autor nieznany - przedruk z exe. vol. 4",
            "\"ON\" - Arkadiusz Bojarun - przedruk z exe vol. 4"
          ]
        },
        { "coverCuriosities" :"Gotowe na wszystko (Desperate Girl Guides)",
          "posts" : [
            "\"Skauting dla chłopców.\" Rozdział IX (wybór) - Robert Baden-Powell o patriotyzmie",
            "Drużynowy - funkcja czy powołanie",
            "Agata Maszczykowska vs. Maciej Leśniak w dziale Szermierka",
            "\"Zbrodnia i kara\" - Maciej Grabowski o systemie kar w ZHP",
            "\"Zlotowa przygoda\" - Beata Araszkiewicz o Zlocie ZHP Kielce 2007",
            "\"Kursantem być...\" - Dorota Szymańska o kursie drużynowych",
            "\"Rajd Ludzi Lekko Głupawych\" - Leszek Kaczanowski, Paweł Maciaszek (przedruk z exe vol.2)",
            "\"Bramobudowanie\" - Tomasz Maksymiuk o bramach Zlotu ZHP Gniezno 2000 (przedruk z exe vol.8)",
            "\"Jest fajne\" - Edyta Siwińska o byciu komendantem hufca",
            "\"By zdobyć szczyt ideałów\" - Grzegorz Kułakowski o wyborze innej drogi (przedruk z exe vol. 8)",
            "\"W pogodni za kubkiem do kawy\" - Michał Borun o hufcowych pracach nad strategią (przedruk z exe vol. 7)",
            "\"...gdzieś około 54. równoleżnika...\" - Tomasz Maksymiuk - artykuł inaugurujący dział \"Herbaciarnia\" (przedruk z exe. vol. 2)",
            "\"Jesień idzie, nie ma rady na to\" - Katarzyna Czerniawska",
            "\"Norge - historia przygody cz. 1\" - Roman Proszkowski i Michał Borun (przedruk z exe. vol.1)"
          ]
        },
        { "coverCuriosities" :"Przebłyski strategii (sałatka.exe 2008)",
          "posts" : [
            "\"Bez związków ze związkiem\" vs. \"Oni żyją\"",
            "Maciej Grabowski vs. Mariusz Cyrulewski w dziale Szermierka",
            "\"Czarując rzeczywistość\" - Agnieszka Kołodziejczyk o projekcie CYRK ZODIAK",
            "\"Bo czasem może się nie chcieć\" - Edyta Siwińska o harcerskiej pracy",
            "\"A pamiętasz jak...\" - Agata Maszczykowska o przyjaźni",
            "\"Harcerskie życie od kuchni cz.1\" - Katarzyna Czerniawska o programie",
            "\"HarcCola classic\" - Maciej Grabowski o renomie każdej z jednostek",
            "\"Idziemy naprzód i ciągle pniemy się wzwyż... ?\" - Agata Maszczykowska o ideałach i autorytetach",
            "\"Po co Koła Przyjaciół Harcerstwa\" - Piotr Czajkowski"
          ]
        },
        { "coverCuriosities" :"Jerzy śni o Maćku...",
          "posts" : [
            "\"My wszyscy z Nich?\" - Monika Nowicka o Roku Małkowskich",
            "\"Akcja zarobkowa - to jest to\" - Beata Araszkiewicz o pakowaniu zakupów w hipermarketach",
            "\"Harcerskie życie od kuchni cz.2\" - Katarzyna Czerniawska o strategii",
            "\"Przewróciło się, niech leży\" - Dorota Szymańska przewrotnie o słowie",
            "\"Green is better\" - Agata Maszyczkowska o tym że fajnie jest być przybocznym",
            "\"Bitwa o Promocję i Informację\" - Marta Mużyło",
            "\"Głuchołazy dziura\" - Maciej Grabowski o XXXI Harcerskim Rajdzie Zimowym 2008",
            "\"Wspólna wędrówka z PoToK-iem w tle\" - Edyta Siwińska o Podharcmistrzowskim Treningu Kadry",
            "\"Kronika zuchowej kolonii w Milówce\" - wypowiedzi zuchów",
            "\"Jerzy śni o Maćku\" - Katarzyna Czerniawska i Dorota Szymańska"
          ]
        },
        { "coverCuriosities" :"Wanted",
          "posts" : [
            "\"Do your best - zrób to inaczej\" - Agata Maszczykowska o naszych rajdach",
            "\"Czy róża pod inną nazwą pachaniałaby inaczej\" - Dorota Szymańska o chwytliwej nazwie",
            "\"Express zamiast ciuchci\" - Edyta Siwińska o pociągu do strategii",
            "\"Gorący kawałek blachy\" - Dorota Dobraszak pyta czy Krzyż Harcerski to sacrum czy tylko symbol idei",
            "\"Jak to jest z tym pogodno.exe\" - Marta Mużyło szerzej o gazecie",
            "\"Jak powstaje pogodno.exe\" - Łukasz Muzykiewicz o zamieszaniu wydawniczym",
            "\"Znów wędrujemy ciepłym krajem\" - Beata Araszkiewicz o wędrowaniu",
            "\"Rower power\" - Łukasz Muzykiewicz o wyższości roweru nad...",
            "\"Artykuł o tym jak pisać artykuł\" - Marta Mużyło",
            "\"Tropem korzeni Krzyża Harcerskiego cz.I\" - Rafał Raniowski",
            "\"Miasteczko korczakowej myśli\" - Maciej Grabowski o dziecięcej wiosce w Podgrodziu"
          ]
        },
        { "coverCuriosities" :"Znajdź swoją drogę",
          "posts" : [
            "\"Tropem Krzyża Harcerskiego cz.2\" - Rafał Raniowski o Krzyżu",
            "\"Przyjmuję obowiązku instruktora\" - Katarzyna Czerniawska o opiekunie próby",
            "\"Harcerstwo XXI wieku\" - Jan Bober o konieczności wprowadzenia zmian",
            "\"OTP siła\" - Maciej Grabowski o odznakach turystyki pieszej",
            "\"HaeSi\" - Agata Maszczykowska o roli drużynowego",
            "\"Historia na Placu Sprzymierzonych\" - Dorota Szymańska o robieniu czegoś jeszcze",
            "\"Druga bitwa o Promocję i Informację\" - Marta Mużyło i Łukasz Zawidzki",
            "\"Utopia HIV\" - Daniel Głowa"
          ]
        },
        { "coverCuriosities" :"Floating Pogodno",
          "posts" : [
            "\"Nasz jest ten kawałek ziemi\" - Maciej Grabowski o naszym Miroszewie",
            "\"Jak to jest być szefem sztabu\" - Dorota Szymańska o finale WOŚP",
            "\"Dlaczego warto być zuchem\" - Dorota Szymańska o tym dlaczego dziecko powinno być zuchem",
            "\"O grzechu\" - Mariusz Cyrulewski o grzechu zaniechania",
            "\"Morze, czy góry - obóz harcerski\" - Jan Bober",
            "\"Nie będzie artykułu\" - Edyta Siwińska o harcerstwie emocji i chwili",
            "\"Warzywa i owoce - naturalne źródło witamin\" - Beata Araszkiewicz o zdrowym odżywianiu"
          ]
        },
        { "coverCuriosities" :"Ostatnio",
          "posts" : [
            "\"Nasz hufcowy\" - Beata Araszkiewicz o Badetce",
            "\"Drużynowy harcerzy starszych\" - Agnieszka Kołodziejczyk",
            "\"Latawiec\" - Monika Nowicka",
            "\"regiony.zhp.pl\" - Łukasz Muzykiewicz o znaczeniu informacji",
            "\"Dzięki harcerstwu\" - Maciej Grabowski o tym co daje harcerstwo",
            "\"Sznur granatowy\" - Marta Mużyło o zlocie drużynowych",
            "\"Umarli ratują żywych\" - Jakub Dudziński o transplantacji",
            "\"Spal Buty\" - Zuzanna Szklarska o rajdzie hufca",
            "\"Spowiedź drużynowej\" - Agnieszka Kołodziejczyk"
          ]
        },
        { "coverCuriosities" :"Zapłać u mnie składki!",
          "posts" : [
            "\"Kłamstwo\" - Anna Sitek o danym słowie",
            "\"Harcerstwo - alternatywa\" - Arkadiusz Bojarun o tym co zawdzięcza harcerstwu",
            "\"Wspomnienia z obozu\" - Agnieszka Kołodziejczyk o drużynowym na obozie",
            "\"Znów wędrujemy\" - Maciej Grabowski o obozie wędrownym",
            "\"Kursowa Watra zapłonęła\" - kursanci Kursu Zastępowych Watra IX",
            "\"Wsłuchany w twą cichą piosenkę\" - Maciej Grabowski o koncercie Wolnej Grupy Bukowina",
            "\"Tam, gdzie wciąż jesteśmy\" - Monika Nowicka o huśtawce i o miejscu",
            "\"Osobiście\" - Paulina Steier o drodze do zwycięstwa"
          ]
        },
        { "coverCuriosities" :"Dziesiątka pół-wysoka",
          "posts" : [
            "\"Pozlotowe sentymenty\" - Patrycja Kmiecik o przyszłości harcerstwa",
            "\"Ostatni Zajazd na Litwie\" - Maciej Grabowski o Zjeździe Chorągwi",
            "\"Kolonia zuchowa w pigułce\" - Anna Borowczyk o minionej koloni zuchowej",
            "\"Jubileuszowy Zlot ZHP - Zodiakowe wspomnienia\" - Agnieszka Kołodziejczyk o wrażeniach i programie",
            "\"Słowiańskie wakacje w Świnoujściu\" - Kamila Kozłowska o \"Szczęśliwych Misiach\" nad morzem",
            "\"Oda do Edyty S.\" - Wojciech Taraciński",
            "\"To wakacje\" - Dorota Szymańska o twórczości śpiewanej",
            "\"Ciągle pada\" - 82 DH FEN o obozowym deszczu",
            "\"Często pada\" - XXX DH Fosa o obozowym deszczu"
          ]
        },
        { "coverCuriosities" :"Układ okresowy pierwiastków",
          "posts" : [
            "\"Odkłamać krzyż\" - Rafał Raniowski o Krzyżu",
            "\"Udzielić pierwszej pomocy\" - Karolina Strojna o Harcerskiej Szkole Ratownictwa",
            "\"Przyboczny\" - Paweł Wnuk o funkcyjnych",
            "\"Harpagan\" - Łukasz Muzykiewicz o rajdach ekstremalnych",
            "\"Z wizytą w...\" - Maciej Grabowski o Generale",
            "\"Z harcerskimi czasami\" - Maciej Grabowski o tym, co dawno i nie prawda",
            "Wkładka: Nowe standardy kursów drużynowych - porównanie."
          ]
        },
        { "coverCuriosities" :"Druh komendant Czuwa!",
          "posts" : [
            "\"Nowa rzeczywistość\" - Dorota Szymańska o zmianach w systemie stopni",
            "\"A może by tak trójkącik?\" - Maciej Grabowski o połączeniu hufców",
            "\"Relacja z pełnienia funkcji komendanta kursu przybocznych\" - Krzysztof Szymkiewicz",
            "\"Dobre praktyki w kształceniu\" - Dorota Szymańska, Anna Borowczyk, Beata Araszkiewicz-Ochota o konferencji",
            "\"Akcja Arsenał zakończona sukcesem\" - Piotr Jaworski o rajdzie",
            "\"Górniczo-hutnicza orkiestra dęta...zrobiła wielkie pa-pa-ra-ra\ - Jakub Sadowski o I Szczecińskiej Gali WOŚP",
            "\"Survival sensem życia\" - Piotr Jaworski o tym, czym dzisiaj jest survival",
            "\"Jeszcze tylko kwiecień, maj, czerwiec...\" - Anna Borowczyk o nadchodzącej Harcerskiej Akcji Letniej",
            "\"Miłość\" - Wojciech Taraciński o tym czego potrzebuje każdy z nas"
          ]
        },
        { "coverCuriosities" :"Biblioteczka exe!",
          "posts" : [
            "\"Skauting dla chłopców\" - Rozdz. IX - Obozowanie (wybór) - Sir Robert Baden-Powell o tym, jak powinien wyglądać obóz skautów",
            "Stanisław Broniewski \"Orsza\" - Naczelnik Harcerskiej Poczty Polowej o początkach jej działania (przedruk)",
            "\"O celach, ciężkiej pracy, i o tym po co właściwie jest obóz\" - wywiad z Anną Waszewską - komendantem tegorocznego obozu hufca",
            "\"Wakacje z zuchami\" - Anna Borowczyk o ciągły uczeniu się od siebie nawzajem",
            "\"Woodcraft\" - Piotr Jaworski o tym, jak w dzisiejszym świecie kochać przyrodę",
            "\"Weźmy się i zróbcie\" w dziale Galeria",
            "\"ART.biwak - za kulisami\" vs. \"Wspólna służba\", \"ART.biwak - obiektywnie\" oraz \"Kontra\"",
            "Karolina Strona vs. Paweł Wnuk, Tomasz Araszkiewicz i Jan Bober w dziale Szermierka",
            "Przygoda na Półwyspie Brossa - Dorota Szymańska we wspomnieniu o pierwszych harcerskich ścieżkach",
            "\"Cywilizacja roślinności\" - Beata Araszkiewicz-Ochota o tym, co możemy spotkać na leśnej ścieżce",
            "\"Literatura harcerska\" - Elżbieta Kaczewska o tym, co czytać, by wiedzieć",
            "\"By Zodiak jak skała trwał - historia 81\" - Krzysztof Szymkiewicz wspomina, jak to było dawniej i dzięki komu jest teraz.",
            "W numerze nadto - okolicznościowa karta z kalendarza z Muzeum Powstania Warszawskiego oraz magiel obozowy."
          ]
        },
        { "coverCuriosities" :"Opowieść wigilijna",
          "posts" : [
            "Aleksander Kamiński - Monika Niedźwiedzka (Hufiec Goleniów) o tym, że warto czytać i wciąż się uczyć",
            "Zabawy Letnie - Janusz Korczak przypomina o tym, co ważne dla rozwoju fizycznego dzieci",
            "\"i być posłusznym prawu harcerskiemu.\" - Maciej Grabowski o tym, że można napisać to lepiej",
            "\"Nie wystarczy być\" - Michał Borun o tym, że instruktorem się staje, a nie jest",
            "\"Wspinaczka, harcerstwo i egzystencjalizm, czyli dlaczego każdy [dobry] harcerz jest egzystencjalistą, a nie każdy się wspina\" - Wojciech Paryś trochę metafizycznie o życiu harcerza",
            "\"Relacja z zawodów ZHP w ratownictwie - Wadowice 09-11.09.2011\" - Krzysztof Szymkiewicz o tym, że nie zawsze jest tak, jak chcemy",
            "\"Czerwona Koszulka\" - Aleksandra Songin o szkoleniu Pokojowego Patrolu",
            "\"Praca z drużyną a pobyt za granicą\" vs. \"Drużynowy niczym Kaszpirowski\"",
            "Jan Bober vs Dorota Szymańska w dziale Szermierka",
            "\"Po kolonii zuchowej\" vs. \"Po kolonii zuchowej - druga strona medalu\"",
            "Patrycja Kmiecik vs. Anna Borowczyk w dziale Szermierka",
            "\"Dalej bryło z posad świata\" - Maciej Grabowski w Herbaciarni",
            "\"Wzrastanie. Gawęda na nadanie naramiennika Mariuszowi C.\" - Michał Borun",
            "W tym wydaniu także dodatek: oficjalna turystyczna mapa rowerowa Szczecina, którą opracowały osoby związane z naszym hufcem: Justyna Kowalczyk, Marek Kowalczyk, Michał Borun oraz Adrian Łaskarewski."
          ]
        },
        { "coverCuriosities" :"Pokolenie exe",
          "posts" : [
            "\"Geocaching jako forma pracy w drużynie wędrowniczej\" - Katarzyna Bartkiewicz przedstawia nowe formy pracy",
            "\"Podobno chcesz zostać instruktorem?\" - Michał Borun o tym, nad czym trzeba się zastanowić",
            "\"Drużynowy w oczach rodziców, czyli jak dobrze rozmawiać z rodzicami zuchów i harcerzy\" - Katarzyna Bartkiewicz przypomina o tym, żeby rozmawiać z rodzicami podopiecznych",
            "\"Nasz hufcowy\" - Beata Araszkiewicz wspomina hm. Telesfora Badetkę (przedruk z exe vol. 17)",
            "\"Wolontariat europejski - jak zacząć\" - Jan Bober o projektach EVS",
            "\"Miasteczko korczakowej myśli\" - Maciej Grabowski o historii Podgrodzia (przedruk z exe vol. 14)",
            "\"Do wódki musi być zagrycha\" - Maciej Grabowski o tym, że czasami wystarczy pomyśleć",
            "\"O wypadaniu\" - Piotr Brejwo o postawie instruktorskiej",
            "\"By zdobyć szczyt ideałów\" - Grzegorz Kułakowski o odchodzących (przeduk z exe vol. 8)",
            "\"Żeński Hufiec Pogodno\" - Anna Stachowska o tym, co mogło nas czekać (przedruk z exe vol. 4)",
            "\"Nasze wewnętrzne bogactwo - Ogień\" - Katarzyna Czerniawska o wędrownictwie (przedruk z exe vol. 10)"
          ]
        },
        { "coverCuriosities" :"Hairmaster",
          "posts" : [
            "\"Zorganizuj biwak - nie \"spal\" szkoły. Kilka rad dla organizatorów\" - Maciej Grabowski",
            "\"Cukrzyk w drużynie\" - Stanisława Żaczkowska-Ćwik",
            "\"Odnaka Hufca Szczecin-Pogodno\" - Bernard Sack",
            "\"Za mną!\" - Michał Borun",
            "\"Tolerancja i akceptacja w harcerskim społeczeństwie\" - Patryk Jabłoński",
            "\"Wychowawca kolonijny\" - Marek Brejwo",
            "\"Punkt, set, mecz...\" - Anna Borowczyk",
            "\"Od zucha do instruktora\" - Katarzyna Bartkiewicz",
            "\"Przeżyj Arsenał z Pogodnymi Buldożerami\" - Tomasz Krugowiec",
            "\"Mój kurs zastępowych\" - Paulina Sękowska",
            "\"Harcerski Klub Ratowniczy »Pogodno«\" - Marcin Szymczak",
            "\"Sycylia\" - Jan Bober",
            "dodatek: Kurs Zastępowych \"Watra\" X"
          ]
        },
        { "coverCuriosities" :"Kiedy drużynowy się nudzi...",
          "posts" : [
            "\"Jak przygotować obóz?\" - Ryszard Maciulewicz radzi jak zrobić, żeby było dobrze",
            "\"Superman w drużynie\" - Maciej Grabowski o rudnej pracy z bohaterem drużyny",
            "\"Żydowscy skauci i Korczak\" - Michał Sawczuk o tym, jak Janusz Korczak współtworzył żydowski skauting",
            "\"Skauting zaczął się obozem\" - Rafał Raniowski wędruje śladami harcerskiego obozownictwa",
            "\"Druh w gromadzie\" - Bartosz Najda o tym, czy chłopak powinien być zuchowcem?",
            "\"Ryba psuje się od głowy\" - Maciej Grabowski krytycznie o decyzjach władz Związku",
            "\"Gdy czasami czegoś brakuje...\" - Patrycja Kmiecik o tym co zrobić, gdy wypala się w nas ogień",
            "\"Ewidencja, czyli wiem, że nic nie wiem\" - Tomasz Krugowiec o absurdach w ewidencji członków ZHP",
            "\"Złapać za swoje żagle\" - Mikołaj Marczak o eliminacjach do Szkoły Pod Żaglami",
            "\"Rekonstrukcje historyczne -ciekawa lekcja historii\" - Tomasz Krugowiec o tym, jak poczuć i zobaczyć historię",
            "\"Samotny kurs wyjazdowy\" - Nela Mikosza wspomina wyjazd w nieznane",
            "\"Scouting for paperboys (1)\" - Michał Borun o trudach odnalezienia się w Norwegii",
            "\"Harcerski Klub Krótkofalarski SP1ZCV\" - Paulina Borkowska rozmawia z Sebastianem Kubackim o krótkofalarskim hobby."
          ]
        },
        { "coverCuriosities" :"Przepowiednia na koniec świata",
          "posts" : [
            "\"Poradnik nieharcerski\" - Piotr Brejwo radzi do czego wykorzystać popularny napój",
            "\"Na koniec świata... IŚR\" - Dorota Szymańska o wytyczaniu celów",
            "\"Szukając harcerzy wśród harcerzy\" - Jacek Wójcik niekoniecznie o wszechogarniającym hufcu",
            "\"Ad Astra - czy na pewno per aspera?\" - Michał Sawczuk o utworzonym szczepie",
            "\"Połczyn dla seniorów\" - Olga Chojecka-Kasprzyk - lekkim piórem o wyjeździe seniorów",
            "\"Uroczysta zbiórka seniorów\" - Genowefa Bałdyka - relacja z wręczenia Krzyża za Zasługi dla ZHP",
            "\"Twórcy »końca świata»\" - Maciej Grabowski o skomplikowanej metodzie liczenia",
            "\"Scouting for paperboys (2)\" - Michał Borun o trudach odnalezienia się w Norwegii"
          ]
        },
        { "coverCuriosities" :"exe HISTORIA",
          "posts" : [
            "\"Matka Baden-Powella - w końcu 22 lutego to też jej święto\" - Robert Baden-Powell (przedruk z  vol. 5)",
            "\"Gala WOŚP to służba\" - Arkadiusz Bojarun w rozmowie z Anną Waszewską i Jackiem Wójcikiem",
            "\"XXX lat służby - Poczta Harcerska Szczecin II\" - Anna Brejwo",
            "\"Harcerskie Barwy Czasu - pismo ponadczasowe\" - Piotr Tomaszewski",
            "\"Migoczące Światełka\" - Piotr Tomaszewski (przedruk z HBC 15, 1995)",
            "\"Macierzyństwo w mundurze\" - Agnieszka Kołodziejczyk-Królik",
            "\"Dlaczego moje dziecko jest zuchem?\" - Anna Mayer",
            "\"Chłopiec z plakatu - historia pewnej fotografii\" - z Mikołajem Guzem rozmawia Michał Guz",
            "\"Zabawa w gazetę... czy coś więcej? Wspominki sprzed epoki Internetu\" - Maciej Aleksandrowicz",
            "\"Piętno ortodoksji\" - Michał Pogoda",
            "\"Syrenka na Wałach\" - Marcin Parecki",
            "\"Morderca głupich zabaw. Rozmowa o harcerstwie dwadzieścia lat później\" - z Edytą Siwińską - komendantem hufca rozmawia Michał Guz",
            "\"In_farmacja\" - Michał Borun",
            "\"pogodno.exe od deski do deski (1)\" - Michał Borun",
            "\"Nasze Gniazdo samo o sobie\" - Piotr Tomaszewski (przedruk z Naszego Gniazda)",
            "\"Starszoharcerska Akademia Marzeń\" - Anna Brejwo, Arkadiusz Bojarun, Marek Burko, Anna Mayer",
            "\"Starszoharcerski Klub Wędrowniczy Vita Brevis\" - Ewelina Specjal, Tomasz Maksymiuk, Filip Lewandowski (przedruk z vol. 2)",
            "\"Podróż za wschodnią granicę\" - Edyta Siwińska (przedruk z vol. 6)",
            "\"Podróże kształcą\" - Krzysztof Kowalczyk (przedruk z vol. 6)",
            "\"Wspomnienia z Pogranicza\" - zebrały Monika Chojnacka, Maja Marciniak (przedruk z vol. 2)",
            "\"Rajd Ludzi Lekko Głupawych\" - Leszek Kaczanowski, Paweł Maciaszek (przedruk z vol. 2)",
            "\"Babski - jak to się stało?\" - Marcin Zamiatowski",
            "\"Harcerski komiks w Świecie Młodych\" - Leszek Kaczanowski",
            "Świat Młodych: Filutek i harcerska lilijka",
            "\"Łoś i Kot\" - Michał Pogoda",
            "Podharcmistrz Jossarian i wspomnienia czyli potrzeba samorządności",
            "\"O poszukiwaniach pamięci\" - Szymon Sułecki",
            "\"ψ\" - Michał Borun",
            "\"W sumie piszę chyba z domu...\" - Sylwia Kusyk Kolanek",
            "\"Opowieść o pewnym miejscu\" - Piotr Tomaszewski (przedruk z Naszego Gniazda 10, 1992)",
            "\"Opowieść sierpniowa\" - Piotr Tomaszewski (przedruk z Naszego Gniazda 31, 1995)",
            "\"W poszukiwaniu straconego (?) czasu\" - Małgorzata Bojarun",
            "\"Osiedle Przyjaźni\" - Marta Turkot",
            "\"Scouting for paperboys (3)\" - Michał Borun",
            "\"Ściana - wspinaczka na Ziemię Baffina\" - Marcin Tomaszewski (pierwotnie w NG Traveler Polska 2012)",
            "\"ObraSki. Wspomnienia o Wojtku Karczyńskim\" - Zodiak & Przyjaciele"
          ]
        },
        { "coverCuriosities" :"Katastrofa?",
          "posts" : [
            "\"Znak służby, co to takiego?\" - Jacek Wójcik o wędrowniczym instrumencie metodycznym",
            "\"Wizja nas - młodych\" - Patrycja Kmiecik o tym, czego oczekują młodzi instruktorzy",
            "\"Damy radę sprostać wyzwaniom, które nas czekają\" - rozmawiają Elżbieta Chudzik i Maciej Grabowski",
            "\"Czemu u nas to nie działa?\" - Patrycja Kmiecik o tym, jak jest tam, gdzie nie ma nas",
            "\"LZ 128 Hindenburg. Katastrofa, z której możemy wyciągnąć wnioski\" - Maciej Grabowski o tym, że lepiej zapobiegać, niż usuwać skutki",
            "\"Granatowi harcerze w Szczecinie\" - Jakub Mazurkiewicz o odradzających się wodniakach",
            "\"Parę słów o kursach...\" - Anna Brejwo o magii szkoleń",
            "\"Pozostanie wspomnień garść\" - Agata Maszczykowska o spotkaniu po latach",
            "\"Pasja, adrenalina, rywalizacja, braterstwo\" - Grzegorz Surma o propozycji, z której warto skorzystać",
            "\"3. Zlot Kadry ZHP\" - Julia Siemińska: \"Oczywistym było, aby napisać »Harcerz jest zawsze z Pogodna«\"",
            "\"Mój wspaniały tydzień, czyli 3. Zlot Kadry ZHP\" - Ryszard Maciulewicz o tym, że było warto",
            "\"Nie z Orbisem, ale z Pogodnem\" - Julia Siemińska w tekście o wspaniałej kolonii",
            "\"Pogodno.exe od deski do deski (2)\" - Michał Borun o okładkach pogodno.exe",
            "\"III Chorągwiane Zawody w Pierwszej Pomocy\" - Magda Opulska o tym, jak uczą ratować",
            "\"Podharcmistrz Jossarian i sprawność na dwa razy pojmowana\" - felieton",
            "\"Marzenia\" - Jacek wójcik o tym, że podstawowa paleta barw jest dla tych, którzy depczą swoje marzenia",
            "\"Bruno Schulz o znaczkach (markach) pocztowych\" - przedruk fragmentów z najnowszej publikacji o Brunonie Schulzu",
            "\"Scouting for paperboys (4)\" - Michał Borun",
            "\"Świstak zawija w sreberka, a Legia maszeruje dalej...\" - rozmawiają Janusz Czyż i Michał Borun",
            "Dodatek: kalendarium wydarzeń chorągwianych w latach 2010-2013."
          ]
        },
        { "coverCuriosities" :"Pieczątki",
          "posts" : [
            "\"Śladem Starego Doktora. Antologia\" - słów kilka o Januszu Korczaku",
            "\"Przyroda, edukacja ekologiczna, Dzień Ziemi\" - Beata Araszkiewicz-Ochota o Dniu Ziemi",
            "\"Harcerska krew\" - Jakub Cichocki o tym, jak działa harcerska \"Krwilijka\"",
            "\"Mury w Ravensbruck\" - Maciej Grabowski o harcerkach z obozu koncentracyjnego",
            "\"O próbie i próbowaniu\" - Magda Jania o stawianiu sobie wyzwań",
            "\"Kilka pozytywnych slów na wiosnę\" - Julia Siemińska o tym, co zrobić, by zuchy były szczęśliwe",
            "\"Na leśnym szlaku\" - Maciej Grabowski o tym, że wyjście do lasu nie jest trudne",
            "\"O miłości słów kilka\" - Katarzyna Baniewicz o harcerskiej wrażliwości i nie tylko",
            "\"Dyżur w Centrum Powiadamiania Ratunkowego\" - Tomasz Krugowiec o pracy tych, którzy odbierają telefon 112",
            "\"Pogodno.exe od deski do deski (3)\" - Michał Borun, Maciej Grabowski o okładkach pogodno.exe",
            "\"Odsłonięcie tablicy Heliodora Sztarka\" - Paulina Borkowska i wieści ze szczecińskiego podwórka",
            "\"Podharcmistrz Jossarian i kino bluźniercze\"",
            "\"Wybór myśli Janusza Korczaka\""
          ]
        },
        { "coverCuriosities" :"Hetman na c1",
          "posts" : [
            "\"Jeszcze inne metody podążania ku północy\" -  Maciej Grabowski o tym, ze można jeszcze inaczej",
            "\"Śladem Starego Doktora. Antologia (2)\" - kilka słów o Januszu Korczaku",
            "\"Doskonalenie się w służbie na rzecz wychowania. Bezproblemowe otwieranie próby w KSI\" - Adrian Łaskarzewski udziela kilku cennych wskazówek",
            "\"Service projects\" - Dorota Szymańska o stawianiu sobie wyzwań",
            "\"Biali Kurierzy\" - Rafał Raniowski wspomina tych, o których nie możemy zapomnieć",
            "\"Ku chwale zmian\" - Edyta Siwińska o tym, co nieuchronnie nas czeka",
            "\"Komendancka buta\" - Maciej Grabowski o historii wywołanej jednym e-mailem",
            "\"O (nie) przeczytaniu pewnej książki\" - Rafał Raniowski o tym, że warto wrócić do nieprzeczytanych książek",
            "\"Pogodno.exe od deski do deski (4)\" - Michał Borun, Maciej Grabowski",
            "\"Rowerem przez zimę\" - Łukasz Muzykiewicz o rowerowej pasji",
            "\"Kolonijna księga myśli i cytatów\" - dodatek autorstwa Julii Siemińskiej"
          ]
        },
        { "coverCuriosities" :"Czas leczy rany",
          "posts" : [
            "\"Historia (nie) jednej gawędy\" -  Sebastian Kubacki o historii z Warszawy",
            "\"Czym jest Prawo Harcerskie\" - Anna Lisowska o przestrzeganiu Prawa",
            "\"O kształceniu\" - Jakub Cichocki na temat szkoleń w Chorągwi Zachodniopomorskiej",
            "\"Dawniej, a dziś...\" - Różnica między przybocznym, a drużynowym okiem Patrycji Duraj",
            "\"Spinacz moimi oczami\" - Mikołaj Marczak o organizacji kursu przybocznych",
            "\"Chyba do końca nie zwariowałem\" - Historia z życia Marka Izraelskiego",
            "\"Harcerstwo? Kursy? Ale, że jak?\" - Elżbieta Hływa o wstąpieniu do ZHP w wieku 19 lat.",
            "\"Kurs na całe życie\" - Marek Izraelski o Kursie Podharcmistrzowskim \"Szekla\"",
            "\"O kursie przybocznych\" - Julia Siemińska o Spinaczu \"od kuchni\"",
            "\"O tym jak T.R.E.K pojechał do Wilna\" - Małgorzata Celińska na temat wycieczki Harcerskiego Kręgu Akademickiego za granicę.",
            "\"Druh i Druhna\" - Ewa Kołodziejczyk o kropce w skrócie dh",
            "\"To wakacje, pełny luz\" - Dorota Szymańska o wakacjach",
            "\"Śladem Starego Doktora. Antologia (3)\" - kilka słów o Januszu Korczaku"
          ]
        },
        { "coverCuriosities" :"1444",
          "posts" : [
            "\"Pozyskiwanie środków finansowych\" - Patrycja Kmiecik",
            "\"Lider w praktyce (1)\" - Jacek Wójcik",
            "\"Laudacja TC\" -  Rafał Raniowski",
            "\"Wychowanie jest sprawą serca\" - Paweł Ochota",
            "\"Kolonia i obóz. Razem czy osobno?\" - Jacek Wójcik i Patrycja Kmiecik",
            "\"Udzielić? Nie udzielić?\" -  Dorota Szymańska",
            "\"Gdzie umilkły cerkwie i zdziczały sady\" - Karolina Strojna",
            "\"Moje odczucia SPINAKER 2015\" - Karolina Gabryś",
            "\"Jak fajne\" - Edyta Sielicka (Siwińska)"
          ]
        }
    ];
////// Data to save on firebase ///////////////////////////////

   function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    $scope.$on("$routeChangeSuccess", function () {
        vm.acmeDb._content.forEach(function(element,index){
            if (element.document.coverID === $location.path().substring(7)) {
                vm.activeThing = vm.acmeDb._content[index].document;
                vm.showJumbo = true;
                vm.activeIssuuId = vm.acmeDb._content[index].document.id;
                $anchorScroll(vm.acmeDb._content[index].document);
                vm.currentDocumentIndex = index;
                var reviewsRef = ref.child('_content/'+ vm.currentDocumentIndex + '/document/reviews');
                vm.messages = $firebaseArray(reviewsRef);
            }
        });

        if($location.path().substring(1)) {
            vm.showHeader = false;
        } else {
            vm.showHeader = true;
        }
        vm.currentPage = internalDb.getPage();
    });

    if (!vm.acmeDb) { vm.acmeDb = {};
        if (!vm.acmeDb._content) {
            vm.acmeDb._content = [];
            vm.allDoc.forEach(function(element,index){
                vm.acmeDb._content[index] = {};
                vm.acmeDb._content[index].document = {};
                if (!vm.acmeDb._content[index].document.reviews) {
                    vm.acmeDb._content[index].document.reviews = [];
                    if (angular.isDefined(coverCuriosities[index].coverCuriosities)) {
                        vm.acmeDb._content[index].document.coverCuriosities = coverCuriosities[index].coverCuriosities;
                        if(!vm.acmeDb._content[index].document.posts) {
                          vm.acmeDb._content[index].document.posts = [];
                        }
                        coverCuriosities[index].posts.forEach(function(element){
                          vm.acmeDb._content[index].document.posts.push(element);
                        });
                    }
                        vm.acmeDb._content[index].document.coverID = pad(index+1);
                        vm.acmeDb._content[index].document.title = element.document.title;
                        vm.acmeDb._content[index].document.pageCount = element.document.pageCount;
                        vm.acmeDb._content[index].document.created = element.document.created;

                }
                vm.acmeDb._content[index].document.id = element.document.documentId;
            });
        }
    }

/////////////// Navbar ////////////////////////////////////////
    vm.navLinks = [{
        Title: '',
        LinkText: 'Strona Główna'
    }, {
        Title: 'team',
        LinkText: 'O Redakcji'
    }, {
        Title: 'about',
        LinkText: 'O Gazecie'
    }];

    vm.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || '';
        return page === currentRoute ? 'active' : '';
    };
/////////////// Navbar ////////////////////////////////////////

    // function resetDatabase() {
    //     var json = JSON.stringify(vm.acmeDb._content, function( key, value ) {
    //         if( key === "$$hashKey" ) {
    //             return undefined;
    //         }
    //         return value;
    //     });

    //     var finalData = angular.fromJson(json);
    //     var reviewsRef = ref.child('_content/');
    //     reviewsRef.set(finalData);
    // }

    function hideJumbo() {
      return vm.showJumbo = false;
    }

    function isActive(item) {
        return vm.activeThing.coverID === item;
    }

    function go(path)  {
        $location.path(path);
        $anchorScroll();
    }

    function addReview() {
        var reviewsRef = ref.child('_content/'+ vm.currentDocumentIndex + '/document/reviews');
        vm.messages = $firebaseArray(reviewsRef);
        vm.messages.$add(vm.review);
        vm.review = {};
        vm.review.grade = 3;
    }

    function changePagin(){
       internalDb.setPage(vm.currentPage);
    }

  }
})();
