function User(id, name, gender, masteringSkills, lackingSkills, preferences, matchingMentors, rejectedMentors){

   // Add object properties like this
   this.id = id;
   this.name = name;
   this.gender = gender;
   this.masteringSkills = masteringSkills;
   this.lackingSkills = lackingSkills;
   this.preferences = preferences; // Includes languages, locations, groups info and age range
   this.matchingMentors = matchingMentors;
   this.rejectedMentors = rejectedMentors;
}


// Instantiate new objects with 'new'
var mentor1= new User(1,"Natalia", "Female", [], ["Java","Python"],["San Francisco","Portuguese", "30s", "Data Science"], [],[] );
var mentor2= new User(2,"Stephi", "Female", [], ["Java","Python"],["San Francisco","Spanish", "20s", "Surfing"], [],[] );
var mentor3= new User(3,"Lillyan", "Female", [], ["Java","Python"],["New York","Portuguese", "30s", "Data Science"], [],[] );
var mentee1= new User(5,"Catherine","Female", [], ["Java","Python"], ["San Francisco","Portuguese"], [],[] );

var mentors = [ mentor1, mentor2, mentor3];
var mentees = [mentee1];

var skillsUsersDictionary = {}


var usersIDs =[1,2,3,4,5,6,7,8,9];
var bestMentor = getBestMatch(mentees[0].id, mentees, mentors);

// Add methods like this.  All Person objects will be able to invoke this
User.prototype.speak = function(){
    alert("We have a mentor for you:" + this.matchingMentors);//getBestMatch(this.id, mentees, mentors));//this.matchingMentors);
};

document.getElementById("demo").innerHTML =
"x1: " + typeof x1 + "<br>" + 
points.sort()+ "<br>"+
array.sort()+ "<br>"+
getSkills(array[0])+ "<br>"+
array.sort()+ "<br>"+
"x2: " + typeof x2 + "<br>" +
"x7: " + typeof x7 + "<br>" +
"x8: " + typeof x8 + "<br>";

function getMostRepeatedCategory(array){
    if(array.length === 0)
    	return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
    	var el = array[i];
    	if(modeMap[el] === null)
    		modeMap[el] = 1;
    	else
    		modeMap[el]++;	
    	if(modeMap[el] > maxCount)
    	{
    		maxEl = el;
    		maxCount = modeMap[el];
    	}
    }
    return maxEl;
}


function getBestMatch(userID, mentees, mentors) {
// TODO: check from list of matched mentors, if already populated (create frequency)
    var menteeIndex = -1;
    var found = false; //  Boolean(0) is false.
    var i =0;
    while (i< mentees.size() && !found){
        if(mentees[i].id === userID){
            found = true;
            menteeIndex = i; 
        }
    }
    
    var lacksSkills = mentees[menteeIndex].lackingSkills;
    var menteePreferences = mentees[userID].preferences;
    var matchingMentorsRankedIDs = new Set([]); // JS Set simulation
	// find common skill
	for (var mentor in  mentors){
		var mastersSkills = mentor.masteringSkills;
		var mentorPreferences = mentor.preferences;
	 	for(var lacksSkill in lacksSkills)
	    	if (lacksSkill in mastersSkills)
	        	matchingMentorsRankedIDs.add(mentor.id);
	 
		for(var menteePref in menteePreferences)
			if(menteePref in mentorPreferences)
			    if (!matchingMentorsRankedIDs.has(mentor.id))
				    matchingMentorsRankedIDs.add(mentor.id);
		var mentorIDMaxVote = getMostRepeatedCategory(matchingMentorsRankedIDs);
		
		if(!mentees[userID].matchingMentors.has(mentorIDMaxVote)){
		    mentees[userID].matchingMentors.add(mentorIDMaxVote);
		}
		
		var candidateMentors = matchingMentorsRankedIDs.sort().reverse(); // remove duplicates
		
		for(var m in matchingMentorsRankedIDs)
		    if(!mentees[userID].rejectedMentors.has(m))
		        mentees[userID].matchingMentors.add(m);
		
	}	
    var bestMatch = matchingMentorsRanking[0]; 
    mentees[userID].proposedMentors.add(bestMatch);
    return bestMatch;
}

function rejectMentor(userID, mentorID) {
    if(mentees[userID].matchingMentors.has(mentorID) & mentees[userID].proposedMentors.has(mentorID)){
        mentees[userID].rejectedMentors.add(mentorID);
        mentees[userID].proposedMentors.delete(mentorID);
    }
}


// JSON OBJECT FROM REST GET /OTHER EASY DATASTORE:  populateSkillsFromUser(json, mentees, skillsUsersDictionary);
/*
  <body onload="init()">
        <h1 id="title">GeoServer Workshop - REST API trough JavaScript</h1>

        <h2>Available Styles</h2>
           <select id="sldSelect" onchange="updateSelectedSld(this)"></select>

        <h2>Available Layers: 'geosolutions' workspace</h2>
           <select id="lyrSelect" onchange="updateSelectedLyr(this)"></select>

        <br/><br/>
        SLD: <input type="text" id="selectedSld" style="witdh: 300px" readonly> -
        Layer: <input type="text" id="selectedLyr" style="witdh: 300px" readonly>
        <button id="assignSld" onclick="assignSldToLyr()">Assign SLD ----> Layer</button>
  </body>
  */

