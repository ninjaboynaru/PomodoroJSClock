
//No getters/setters are used for the purpose of compatibility
//All methods and properties are public for simplicity

/*
	Class for managing the passing of time in minutes and seconds.
	Has callbacks for when the timer increments or finishes.
	Can count in both directions (up/down)
*/
/*Constructor */ function Timer()
{
	this.seconds = 0;
	this.minutes = 0;
	
	this.onChange = function(){};
	this.onFinish = function(){};
	
	this.state = "stoped";
	
	this.targetSeconds = 0;
	this.targetMinutes = 0;
	
	this.timerID = 0;
	
	var self = this;
	
	
	this.Stop = function()
	{
		this.state = "stoped";
		this.seconds = 0;
		this.minutes = 0;
		this.targetSeconds = 0;
		this.targetMinutes = 0;
		clearInterval(this.timerID);
	}
	this.Pause = function()
	{
		if(this.state == "counting")
		{
			this.state = "paused";
			clearInterval(this.timerID);
		}
	}
	this.Resume = function()
	{
		if(this.state == "paused")
		{
			this.state = "counting";
			this.timerID = setInterval(this.Count, 1000);
		}
	}
	
	this.CountDown = function(startSeconds, startMinutes)
	{
		this.Stop();
		this.targetSeconds = 0;
		this.targetMinutes = 0;
		
		this.minutes = startMinutes;
		if(startSeconds >= 60)
		{
			this.minutes += Math.floor(startSeconds/60)
			this.seconds = startSeconds % 60;
		}
		else
		{
			this.seconds = startSeconds;
		}
		this.state = "counting";
		this.timerID = setInterval(this.Count, 1000);
	}

	this.Count = function()
	{
		if(self.state == "paused" || self.state == "stoped"){return;}
		
		var countDirection = Math.sign(self.targetMinutes - self.minutes);
		if(countDirection === 0){countDirection = Math.sign(self.targetSeconds - self.seconds)};

		if(self.minutes == self.targetMinutes && self.seconds == self.targetSeconds)
		{
			self.Stop();
			self.onFinish();
		}
		else
		{
			self.seconds += countDirection;
			if(self.seconds >= 60){self.seconds = 0; self.minutes += 1;}
			else if(self.seconds < 0){self.seconds = 59; self.minutes -= 1;}
			self.onChange();
		}
	}
	
	this.TotalTime = function() 
	{
		return (this.minutes * 60) + this.seconds;
	}
	
	this.TimeString = function()
	{
		var secString = "";
		var minString = "";
		
		secString += this.seconds;
		minString += this.minutes;
		
		if(secString.length == 1)
		{
			secString = "0" + secString;
		}
		if(minString.length == 1)
		{
			minString = "0" + minString;
		}
		return minString + ":" + secString;	
	}
	
	
}