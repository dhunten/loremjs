var Lorem;
(function() {

    //Create a class named Lorem and constructor
    Lorem = function() {
        //Default values.
        this.type = null;
        this.query = null;
        this.data = null;
    };
    //Static variables
    Lorem.IMAGE = 1;
    Lorem.TEXT = 2;
    Lorem.TYPE = {
        PARAGRAPH: 1,
        SENTENCE: 2,
        WORD: 3
    };
    //Words to create lorem ipsum text.
    Lorem.WORDS = ["Hey dude,","Hey buddy,","Hey,","Great work team,","Way to go team,","Team incredible,","Team awesome,","nice","awesome","incredible","marvelous","stunning","unbelievable","wonderful","impressive","wonderous","good","great","killer","amazing","fantastic","magnificent","formidable","asonishingly great","excellent","fabulous","work","work","work","job","job","job","effort","performance","productivity","achievement","accomplishment","","really","very","incredibly","highly","overly","truly","outstandingly","super","extra","hugely","vastly","immensely","tremendously","work,","case","illustration","lesson","precident","symbol","representation","example","indication","unbelievable.","thanks for always helping me.","you are killing it!", "nice work.","thank you so much for the time you spent.","I cannot thank you enough for your support yesterday (and today) and for what you do everyday for me and many others.","you are ALWAYS there to help!","Thank you, Thank you, Thank you!","congratulations!", "you rock!","you are a workhorse.","awesome job.","great job.","way to set the bar high.", "I can't thank you enough.", "words don't properly express it.","thank you!","big props!","thanks for making my day.", "great job!", "thanks again.","you are so inspiring!", "things will only get better from here.", "thanks for doing what you do and doing it well.", "well done!", "keep it up!", "so happy that you are on the team.", "true A-Player spirit.","couldn't do it without you.","thanks for all your hard work.","you are a force to be reckoned with.","your contributions are greatly appreciated.","I appreciate the effort!","you went above and beyond.","you set the bar."];

    //random integer method.
    Lorem.prototype.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    //text creator method with parameters: how many, what
    Lorem.prototype.createText = function(count, type) {

        switch (type) {

            //paragraphs are loads of sentences.
            case Lorem.TYPE.PARAGRAPH:
                var paragraphs = new Array;
                for (var i = 0; i < count; i++) {
                    var paragraphLength = this.randomInt(10, 20);
                    var paragraph = this.createText(paragraphLength, Lorem.TYPE.SENTENCE);
                    paragraphs.push('<p>'+paragraph+'</p>');
                }
                return paragraphs.join('\n');
                break;

            //sentences are loads of words.
            case Lorem.TYPE.SENTENCE:
                var sentences = new Array;
                for (var i = 0; i < count; i++) {
                    var sentenceLength = this.randomInt(5, 10);
                    var words = this.createText(sentenceLength, Lorem.TYPE.WORD).split(' ');
                    words[0] = words[0].substr(0, 1).toUpperCase() + words[0].substr(1);
                    var sentence = words.join(' ');

                    sentences.push(sentence);
                }
                return (sentences.join('. ') + '.').replace(/(\.\,|\,\.)/g, '.');
                break;

            //words are words
            case Lorem.TYPE.WORD:
                var wordIndex = this.randomInt(0, Lorem.WORDS.length - count - 1);

                return Lorem.WORDS.slice(wordIndex, wordIndex + count).join(' ').replace(/\.|\,/g, '');
                break;
        }
    };
    Lorem.prototype.createLorem = function(element) {

        var lorem = new Array;
        var count;
        
        if (/\d+-\d+[psw]/.test(this.query)){
            var range = this.query.replace(/[a-z]/,'').split("-");
            count = Math.floor(Math.random() * parseInt(range[1])) + parseInt(range[0]);
        } else {
            count = parseInt(this.query); 
        }
        
        if (/\d+p/.test(this.query)) {
            var type = Lorem.TYPE.PARAGRAPH;
        }
        else if (/\d+s/.test(this.query)) {
            var type = Lorem.TYPE.SENTENCE;
        }
        else if (/\d+w/.test(this.query)) {
            var type = Lorem.TYPE.WORD;
        }

        lorem.push(this.createText(count, type));
        lorem = lorem.join(' ');

        if (element) {
            if (this.type == Lorem.TEXT) {
                element.innerHTML += lorem;
            }
        }

        if (element == null) {
            return lorem;
        }
    };

    //Register as jQuery
    if (typeof jQuery != 'undefined') {
        (function($) {
            $.fn.lorem = function() {
                $(this).each(function() {
                    var lorem = new Lorem;
                    lorem.type = $(this).is('img') ? Lorem.IMAGE : Lorem.TEXT;
                    
                    //data-lorem can be taken with data function (thanks to http://forrst.com/people/webking)
                    lorem.query = $(this).data('lorem');
                    lorem.createLorem(this);
                })
            };

            //If developer run this javascript, then we can run the lorem.js
            $(document).ready(function() {
                $('[data-lorem]').lorem();
            });
        })(jQuery);
    }

})();