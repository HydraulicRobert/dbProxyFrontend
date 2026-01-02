	export async function getLoginToken(username,password, loginURL){
		try{
			var token;
			const loginResponse = await fetch(loginURL, {
						method: "POST",
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json'
						},
						body: JSON.stringify({
							username: username, 
							password: password
						})
					});
			token = await loginResponse.text();
			console.log("token successfully aquired"); 
			return token;
		}catch(error){
			console.error("login error", error);
		}
	}
