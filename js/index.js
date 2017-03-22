
var sessionTimer = new Timer();
var breakTimer = new Timer();

GeneralSetup();
function GeneralSetup()
{
	sessionTimer.onChange = TimerUpdate;
	sessionTimer.onFinish = SessionFinish;
	breakTimer.onChange = TimerUpdate;
	breakTimer.onFinish = BreakFinish;	
}


function GetSessionTime()
{
	return Number(document.getElementById("SessionTime").textContent);
}
function GetBreakTime()
{
	return Number(document.getElementById("BreakTime").textContent);
}
function IncrementBreakTime(increment)
{
	var ui = document.getElementById("BreakTime");
	var numberValue = Number(ui.textContent) + increment;
	if(numberValue < 0){numberValue = 0};
	
	ui.textContent = numberValue;
}
function IncrementSessionTime(increment)
{
	var ui = document.getElementById("SessionTime");
	var numberValue = Number(ui.textContent) + increment;
	if(numberValue < 0){numberValue = 0};
	
	ui.textContent = numberValue;
}
function UpdateCurrentTimeUI(timeString)
{
	document.getElementById("CurrentTime").textContent = timeString;
}
function SetTimerTitle(newTitle)
{
	document.getElementById("CurrentTimer").textContent = newTitle;
}
function ToggleIconToPlay()
{
	document.getElementById("ToggleButton").className = "ButtonIcon fa fa-play";
}
function ToggleIconToPause()
{
	document.getElementById("ToggleButton").className = "ButtonIcon fa fa-pause";
}


function ToggleTimer()
{
	if(sessionTimer.state == "counting")
	{
		sessionTimer.Pause();
		ToggleIconToPlay();
		SetTimerTitle("Session Paused");
	}
	else if(breakTimer.state == "counting")
	{
		breakTimer.Pause();
		ToggleIconToPlay();
		SetTimerTitle("Break Paused");
	}
	
	else if(sessionTimer.state == "paused")
	{
		sessionTimer.Resume();
		ToggleIconToPause();
		SetTimerTitle("Session");
	}
	else if(breakTimer.state == "paused")
	{
		breakTimer.Resume();
		ToggleIconToPause();
		SetTimerTitle("Break");
	}
	
	else
	{
		sessionTimer.CountDown(0, GetSessionTime() );
		ToggleIconToPause();
		SetTimerTitle("Session");
	}
}
function ResetTimer()
{
	sessionTimer.Stop();
	breakTimer.Stop();
	ToggleIconToPlay();
	SetTimerTitle("Press Play");
	UpdateCurrentTimeUI("00:00");
}



function SessionFinish()
{
	breakTimer.CountDown(0, GetBreakTime() );
	SetTimerTitle("Break");
}
function BreakFinish()
{
	sessionTimer.CountDown(0, GetSessionTime() );
	SetTimerTitle("Session");
}



function TimerUpdate()
{
	if(sessionTimer.state == "counting")
	{
		UpdateCurrentTimeUI(sessionTimer.TimeString() );
	}
	else if(breakTimer.state == "counting")
	{
		UpdateCurrentTimeUI(breakTimer.TimeString() );
	}
}



