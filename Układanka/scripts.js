window.clicksAmount = 0;
window.clickableCells;
window.boards=["<table id=\"tab\"><tr><td></td><td></td><td class=\"unselectable\"></td><td></td><td></td></tr><tr><td></td><td></td><td class=\"unselectable\"></td><td></td><td></td></tr><tr><td></td><td></td><td class=\"unselectable\"></td><td></td><td></td></tr><tr><td></td><td></td><td class=\"unselectable\"></td><td></td><td></td></tr><tr><td></td><td></td><td class=\"unselectable\"></td><td></td><td></td></tr></table>",
"<table id=\"tab\"><tr><td></td><td class=\"unselectable\"></td><td class=\"unselectable\"></td><td></td><td class=\"unselectable\"></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td class=\"unselectable\"></td><td></td><td class=\"unselectable\"></td></tr><tr><td></td><td></td><td></td><td></td><td class=\"unselectable\"></td></tr><tr><td class=\"unselectable\"></td><td></td><td></td><td></td><td></td></tr></table>",
"<table id=\"tab\"><tr><td></td><td></td><td></td><td></td><td class=\"unselectable\"></td></tr><tr><td class=\"unselectable\"></td><td></td><td class=\"unselectable\"></td><td></td><td></td></tr><tr><td></td><td></td><td class=\"unselectable\"></td><td></td><td class=\"unselectable\"></td></tr><tr><td></td><td class=\"unselectable\"></td><td></td><td></td><td class=\"unselectable\"></td></tr><tr><td></td><td class=\"unselectable\"></td><td></td><td class=\"unselectable\"></td><td></td></tr></table>"]
$(document).ready(function () {
    $("#startButtonDiv button").click(function(e){
        $(this).css("display","none");
        $(this).prepareGame();
    });
    

    $(this).showClicksAmount();
});  

jQuery.fn.extend({
    toggleCells: function () {
        window.clicksAmount++;
        $(this).showClicksAmount();
        var $this = $(this);
        $this.toggleClass("on").next("td").not(".unselectable").toggleClass("on");
        $this.prev("td").not(".unselectable").toggleClass("on");
        var cellIndex = $this.index();
        $this.closest("tr").prev().children().eq(cellIndex).not(".unselectable").toggleClass("on");
        $this.closest("tr ").next().children().eq(cellIndex).not(".unselectable").toggleClass("on");
        $this.checkIfWon();
    }
});
jQuery.fn.extend({
    showClicksAmount: function () {
        $("#clicks h1").text("Liczba kliknięć: "+window.clicksAmount);
    }
});

jQuery.fn.extend({
    checkIfWon: function () {
        if ($("#tab td.on").length == window.clickableCells) {
            $("#heading h1").text("Układanka: WYGRANA!!!");
            $("td").not(".unselectable").off('click');
        }
    }
});
jQuery.fn.extend({
    prepareGame: function () {
        var random=Math.floor(Math.random() * window.boards.length); 
        console.log(random);  
  
        $("#tableDiv").append(window.boards[random]);
        $("td").not(".unselectable").click(function (e) {
        $(this).toggleCells();
        
    });
    window.clickableCells=$("td").not(".unselectable").length;
        $("#clicks").css("display","block");
    }
});

