ideaWatchers.view.MainMenu = ideaWatchers.view.MainMenu || (function UICMainMenu() {

    //region local vars
    // Event Globale Initialisierung
    var evIni = {
        topic: 'internal/ini',
        cbFunction: cbiIni
    };
    var htmlBtnHot;
    var htmlBtnTrending;
    //endregion

    //region subscribe to events
    ideaWatchers.core.MessageBroker.subscribe(evIni);
    //endregion

    function cbiIni() {
        console.log('ini Event');
        htmlBtnHot = document.querySelector('.js-mainMenu-btnHome');
        htmlBtnHot.addEventListener('click',handleButtonNavigation);
    }

    function handleButtonNavigation(clickEvent){

        console.log('htmlBtnHot geklickt');
        ideaWatchers.core.Navigator.switchView({
            viewId: 'mainView',
            url: 'myMainView'
        });
    }

    return {

    };

})();