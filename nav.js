var mobileNavButton = $("#open-nav-js");
var navLinks = $("nav > a > div");

mobileNavButton.click(()=>
{
    navLinks.toggle();

    let displayValue = navLinks.css("display");

    if (displayValue == "block") navLinks.css("display", "inline-block");

    navLinks.toggleClass("fade-in");
});

window.addEventListener("resize", ()=>
{
    let displayValue;

    if (window.innerWidth > 600) displayValue = "inline-block";
    else displayValue = "none";

    if (displayValue == "none" && navLinks.css("display") != "none") return;

    navLinks.css("display", displayValue);
});
