var startTime = Date.now();
var dt;
var time = 0;

function updateTime()
{
    let preTime = time;
    time = (Date.now() - startTime) * 0.001; // 'now' - 'start' = 'time since start'...
    dt = time - preTime; // the change in time...
}