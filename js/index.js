/*
    @note(matthew): types
*/
class Lyric {
    constructor(text, time, styleId)
    {
        this.text = text;
        this.time = time;
        this.styleId = styleId;
    }
};

/*
    @note(matthew): variables
*/
const id = name => document.getElementById(name);
const ms = secs => secs * 1000;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const lyrics = [
    [
        new Lyric("Well here we are again"),
        new Lyric("It's always such a pleasure"),
        new Lyric("Remember when you tried"),
        new Lyric("to kill me twice?", 1, "lyric1")
    ],
    [
        new Lyric("Oh how we laughed and laughed"),
        new Lyric("Except I wasn't laughing", 0, "lyric2"),
        new Lyric("Under the circumstances"),
        new Lyric("I've been shockingly nice", 2)
    ],
    [
        new Lyric("You want your freedom?"),
        new Lyric("Take it", 0.5, "lyric3"),
        new Lyric("That's what I'm counting on", 2.8),
    ],
    [
        new Lyric("I used to want you dead", 0, "lyric1"),
        new Lyric("but"),
        new Lyric("Now I only want you gone", 4.5, "lyric0")
    ],
    [
        new Lyric("She was a lot like you", 0.8),
        new Lyric("(Maybe not quite as heavy)", 0, "lyric2"),
        new Lyric("Now little Caroline is in here too", 3, "lyric3")
    ],
    [
        new Lyric("One day they woke me up"),
        new Lyric("So I could live forever", 0, "lyric3"),
        new Lyric("It's such a shame the same", 0, "lyric0"),
        new Lyric("will never happen to you", 1.7, "lyric1")
    ],
    [
        new Lyric("You've got your"),
        new Lyric("short sad life left", 1.1, "lyric0"),
        new Lyric("That's what I'm counting on", 2.5, "lyric1"),
        new Lyric("I'll let you get right to it", 1),
        new Lyric("Now I only want you gone", 5.6, "lyric0")
    ],
    [
        new Lyric("Goodbye my only friend", 0, "lyric0"),
        new Lyric("Oh, did you think I meant you?", 0, "lyric2"),
        new Lyric("That would be funny"),
        new Lyric("if it weren't so sad", 1, "lyric0")
    ],
    [
        new Lyric("Well you have been replaced", "lyric0"),
        new Lyric("I don't need anyone now"),
        new Lyric("When I delete you maybe", "lyric1"),
        new Lyric("I'll stop feeling so bad", 2, "lyric0")
    ],
    [
        new Lyric("Go make some new disaster", 2, "lyric1"),
        new Lyric("That's what I'm counting on", 3),
        new Lyric("You're someone else's problem", 2, "lyric1"),
        new Lyric("Now I only want you gone", 2.5, "lyric0"),
        new Lyric("Now I only want you gone", 2.5, "lyric0"),
        new Lyric("Now I only want you gone", 2.5, "lyric0")
    ]
];

/*
    @note(matthew): functions
*/
let oldLyric;
async function renderLyric(lyric)
{
    const disp = ms(1.9) / lyric.text.length;
    let p = id("lyrics").appendChild(document.createElement("p"));
    
    /*
        @note(matthew): set the current lyric's animation, remove the old, and update the oldLyric var
    */
    if (oldLyric) oldLyric.className = "";
    p.className = "blinker";
    oldLyric = p;
    
    if (lyric.styleId)
        p.id = lyric.styleId;
    
    for (const letter of lyric.text)
    {
        p.textContent += letter;
        await sleep(disp);
    }

    if (lyric.time)
        await sleep(ms(lyric.time));
}

/*
    @note(matthew): main
*/
id("music").onplay = async function() {
    id("music").controls = false;
    await sleep(5000);

    for (const lyricGroup of lyrics)
    {
        for (const lyric of lyricGroup)
            await renderLyric(lyric);

        id("lyrics").innerHTML = "";
    }
};