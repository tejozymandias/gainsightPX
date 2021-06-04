//Run PX Tag

//REST API DEMO SITE
//e7781811-93e6-43bf-bd98-8bc8f4f6d867

const departments = ["Finance","Marketing","Sales","Engineering","Customer Service","Human Resources"];
const languages = ["English","Spanish","German","Arabic","French"];
const accounts = [
	{
	name:"Amazon",
	website:"www.amazon.com",
	industry:"Retail",
	numberOfEmployees:"1500"
	},
	{
	name:"BMW",
	website:"www.bmw.com",
	industry:"Automobile",
	numberOfEmployees:"500"
	},
	{
	name:"Tesla",
	website:"www.tesla.com",
	industry:"Automobile",
	numberOfEmployees:"300"
	},
	{
	name:"IBM",
	website:"www.ibm.com",
	industry:"Technology",
	numberOfEmployees:"2500"
	},
	{
	name:"Gainsight",
	website:"www.gainsight.com",
	industry:"Technology",
	numberOfEmployees:"700"
	},
	{
	name:"Microsoft",
	website:"www.microsoft.com",
	industry:"Technology",
	numberOfEmployees:"2500"
	},
	{
	name:"FlipKart",
	website:"www.flipkart.com",
	industry:"Retail",
	numberOfEmployees:"200"
	}
	];


(function(n,t,a,e,co){var i="aptrinsic";n[i]=n[i]||function(){
	(n[i].q=n[i].q||[]).push(arguments)},n[i].p=e;n[i].c=co;
  var r=t.createElement("script");r.async=!0,r.src=a+"?a="+e;
  var c=t.getElementsByTagName("script")[0];c.parentNode.insertBefore(r,c)
  })(window,document,"https://web-sdk.aptrinsic.com/api/aptrinsic.js","AP-DT38BLOGLNV8-2");



(function (){
	if ((window.location.href.indexOf('index')>-1) && (sessionStorage.getItem('loginPx') !== null)) {
		console.log('ran first iife');
		location.href = "main.html";
		return;
	} 
})();


  (function (){
	document.addEventListener('DOMContentLoaded',()=>{
		if(location.href.indexOf('main')>-1){
			const login = sessionStorage.getItem('loginPx');
			document.getElementById('logo').innerText = login;
			console.log('ran 2nd iife');
		} else {
			return;
		}
		// Submit Form on Main Page as  a Custom Event
		document.querySelector('#form-submit').addEventListener('click', (e) => {
			e.preventDefault();
			const name = document.getElementById('senderName').value;
			const email = document.getElementById('senderEmail').value;
			const gender =  [...document.getElementsByName('radio')].find((radio) => radio.checked).value;	
			const select = document.getElementById('senderRole');
			const role= select.options[select.selectedIndex].text;
			const message = document.getElementById('senderMessage').value;
			aptrinsic('track', 'form-data', {"name":name,"email":email,"gender":gender,"role":role,"message":message}); 
			alert('Form Data Sent to PX');
		  });
	  });	
  })();

function generateRandomUser(){
	fetch('https://randomuser.me/api')
  .then(response => response.json())
  .then(data => {
	const results = data.results[0];
	const firstName = results.name.first; 
	const lastName = results.name.last;
	const email = results.email;	
	const city = results.location.city;
	const stateName = results.location.state;
	const country = results.location.country;
	const postalCode = results.location.postcode;
	const gender = results.gender;
	const language = languages[Math.floor(Math.random()*languages.length)];
	const phone = results.cell;
	const latitude = results.location.coordinates.latitude;
	const longitude = results.location.coordinates.longitude;
	const role = departments[Math.floor(Math.random()*departments.length)];
	const accountName = accounts[Math.floor(Math.random()*accounts.length)];	
	const emailFinal = email.replace("example",accountName.name).toLowerCase();
	sessionStorage.setItem("loginPx", emailFinal); 
	aptrinsic("identify",
	{
		"id" : emailFinal,
		"email": emailFinal,
		"firstName": firstName,
		"lastName": lastName,
		"role": role,
		"city": city,
		"stateName":stateName,
		"countryName":country,
		"postalCode": postalCode,
		"latitude":latitude,
		"longitude":longitude,
		"gender":gender,
		"phone":phone,
		"Language":language
	},{
		"id": "PX-ID-"+accountName.name, //Required	
		"name": accountName.name,
		"website": accountName.website,
		"industry":accountName.industry,
		"numberOfEmployees":accountName.numberOfEmployees
	
	});
	alert("Logged in user id: "+ firstName);
	window.location = "main.html";
  });
}


function loginExistingUser(){
	fetch('https://api.aptrinsic.com/v1/users?pageSize=1000', {
		method: "GET",
		headers: {"X-APTRINSIC-API-KEY": "e7781811-93e6-43bf-bd98-8bc8f4f6d867"}
	  })
	  .then(response => response.json()) 
	  .then(data => {
		const length = data.users.length;
	   const email = data.users[Math.floor(Math.random() * length)].email;
	   const accountId = data.users[Math.floor(Math.random() * length)].accountId;
	   sessionStorage.setItem("loginPx", email); 
	   aptrinsic("identify",
	   {
		   "id" : email  //Required
	   },{
		   "id": accountId, //Required	  
	   });
	   alert("Successfully Logged in");
	   window.location = "main.html";
	  }); 
}

function logMeIn(){		
	const formInputs = document.getElementsByClassName('form__input'); 
	try {
		if((formInputs[0].value.indexOf("gainsight.com")>-1) || (formInputs[0].value.indexOf("tesla.com")>-1) || (formInputs[0].value.indexOf("apple.com")>-1) || (formInputs[0].value.indexOf("amazon.com")>-1)) {
			const email = formInputs[0].value;
			sessionStorage.setItem("loginPx", email); 
			const domain = formInputs[1].value;
			const accountId = "PX-ID"+domain;
			const name = formInputs[2].value.split(' ');
			const firstName = name[0];
			const lastName = name[1];					
			const role = departments[Math.floor(Math.random()*departments.length)];
			aptrinsic("identify",
			{
				"id" : email,
				"email": email,
				"firstName": firstName,
				"lastName": lastName,
				"role": role,
			},{
				"id": accountId, //Required	
				"name": domain				
			});
			console.log(email,firstName,lastName,domain);
			alert("Logged in user id: "+ firstName);
			window.location = "main.html";	
		} else{
			alert("Please enter a valid Email ID");
		}	
	} catch (error) {
		console.log('catch '+error);
	}		}





// aptrinsic('identify',{"id":Date.now(),"email":"cooliio@apple.com","firstName":"cool","lastName":"idio"},{"id":"UID1549611","name":"apple"});
//aptrinsic('identify',{"id":"dosa","email":"dosaidly@amazon.com","firstName":"dosa","lastName":"idly"},{"id":"UID1549612","name":"amazon"});


function logOut(){
	sessionStorage.removeItem('loginPx');
	window.aptrinsic('reset');
	location.href ='index.html';
}


// Global Context o

(function (){
	document.addEventListener('DOMContentLoaded',()=>{
		if(location.href.indexOf('engagement')>-1){
			aptrinsic('set', 'globalContext', {"version":555, "name":"Engagement"});
		} else if (location.href.indexOf('product-mapper')>-1) {
			aptrinsic('set', 'globalContext', {"version":556, "name":"Product Mapper"});
		} else if (location.href.indexOf('analytics')>-1) {
			aptrinsic('set', 'globalContext', {"version":557, "name":"Analytics"});
		} else if (location.href.indexOf('dashboard')>-1) {
			aptrinsic('set', 'globalContext', {"version":558, "name":"Dashboard"});
		} else if ((location.href.indexOf('sdk')>-1) || (location.href.indexOf('attributes')>-1)) {
			aptrinsic('set', 'globalContext', {"version":559, "name":"General Settings"});
		} 		
	  });	
  })();







