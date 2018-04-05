var h2Ticker = $("h2")[0];
var h2HasBlinked;
var tickNum = 0;

function animateTicker()
{
    if (time % 2 < 1) 
    { return; }

    const mid = 0.8; const end = 1;
    h2Ticker.style.filter = "blur(" + hillCurve(mid, end, (window.innerWidth < 600)? window.innerWidth / 100 : 6) + "px)";
    if (h2HasBlinked && time % end < mid) { h2HasBlinked = false; }
    else if (!h2HasBlinked && time % end > mid) {h2HasBlinked = true; h2Ticker.innerHTML = getTicker()}

    function getTicker()
    {
        tickNum = ++tickNum % 5;
        switch(tickNum)
        {
            case(0): return "entertainment";
            case(1): return "media";
            case(2): return "games";
            case(3): return "animation";
            case(4): return "videos"
        }
    }
}