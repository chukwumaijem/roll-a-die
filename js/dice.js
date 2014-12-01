(function () {
    $.fn.dice6 = function (eye) {
        if (!eye) {
            eye = Math.floor(Math.random() * 6) + 1;
        }
    };
})();

var dice6 = function (n) {
    var a = $('audio');
    var volume = (a.length > 0) ? a[0].volume : 1;
    var audio = $('<audio>').attr('id', 'dice-sound').attr('src', 'sound/nc93322.mp3').appendTo(document.body).each(function () {
        setTimeout(function () {
            this.volume = volume;
            this.play();
        }.bind(this), Math.random() * 500);
    });

    var angle = {
        1: [90, 0],
        2: [0, 90],
        3: [180, 0],
        4: [0, 0],
        5: [0, -90],
        6: [-90, 0],
    }[n];
    var outer = $('<div>').addClass('dice-outer').appendTo('#dice-table');
    var dice = $('<div>')
        .addClass('dice')
        .css('transform', 'rotateX(' + angle[0] + 'deg) rotateZ(' + angle[1] + 'deg)')
        .prependTo(outer);

    var eyes = {
        1: '<svg class=dice-face width=32 height=32><circle cx=16 cy=16 r=6 fill=red /></svg>',
        2: '<svg class=dice-face width=32 height=32><circle cx=8 cy=8 r=3 /><circle cx=24 cy=24 r=3 /></svg>',
        3: '<svg class=dice-face width=32 height=32><circle cx=8 cy=8 r=3 /><circle cx=16 cy=16 r=3 /><circle cx=24 cy=24 r=3 /></svg>',
        4: '<svg class=dice-face width=32 height=32><circle cx=8 cy=8 r=3 /><circle cx=24 cy=24 r=3 /><circle cx=8 cy=24 r=3 /><circle cx=24 cy=8 r=3 /></svg>',
        5: '<svg class=dice-face width=32 height=32><circle cx=16 cy=16 r=3 /><circle cx=8 cy=8 r=3 /><circle cx=24 cy=24 r=3 /><circle cx=8 cy=24 r=3 /><circle cx=24 cy=8 r=3 /></svg>',
        6: '<svg class=dice-face width=32 height=32><circle cx=8 cy=16 r=3 /><circle cx=24 cy=16 r=3 /><circle cx=8 cy=8 r=3 /><circle cx=24 cy=24 r=3 /><circle cx=8 cy=24 r=3 /><circle cx=24 cy=8 r=3 /></svg>'
    };

    for (var i = 1; i <= 6; ++i) {
        dice.append(eyes[i]);
    }

    setTimeout(function () {
        outer.fadeOut(function () {
            this.remove();
            audio.remove();
        });
    }, 3 * 1000);
};

$(function () {
    $('<div>').attr('id', 'dice-table').prependTo(document.body);
});
