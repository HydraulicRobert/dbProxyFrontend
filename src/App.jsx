import {useEffect, useState} from 'react'
import { useRef } from 'react'
import './App.css'
import {getLoginToken} from './components/restGetToken.jsx'
import { GetSettingsTime } from './components/restGetSettingsTime.jsx'
import { GetNewestNotTime } from './components/restGetNewestNotTime.jsx'
import {GetNotifications} from './components/restGetNots.jsx'
import { LoginForm } from './components/loginForm.jsx'
import { UiFooter } from './components/UiFooter.jsx'
import { UiHeader } from './components/UiHeader.jsx'
import { UiHeaderNotLoggedIn } from './components/uiHeaderNotLoggedIn'
	
function App() {
/*	const webURL = "http://localhost:8080/";
	const loginURL = webURL+"login";
	const notificationURL = webURL+"notAll";
	const settingsURL = webURL+"set";
	const newestNotURL = webURL+"notTop1";*/
	var webURLText = "  ";
	const headerVersionNumber = useRef(Math.floor(Math.random()*9)+1+"."+Math.floor(Math.random()*99)+1);
	const [count, setCount] = useState(0);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [jwtToken, setJwtToken] = useState("");
	const [userData, setUserData] = useState(null);
	const [status, setStatus] = useState("N/A");
	const [settingsTime, setSettingsTime] = useState("");
	const [newestNotTime, setNewestNotTime] = useState("");
	const [notAllRefresh, setNotAllRefresh] = useState(0);
	const [urls, setUrls] = useState(null);	
		
	useEffect(() => {
	},[jwtToken]);
	const handleNotifications = async() => {
		setStatus("loading");
		const notificationList = await getNotifications(jwtToken,  urls.notAll)
		setStatus("idle");
	};
	const handleLogin = 
		async({username, password})=> {
			setStatus("loading");
			setUserData({username, password});
			const receivedToken = await getLoginToken(username, password, urls.login, notAllRefresh);
			setJwtToken(receivedToken);
			setStatus("idle");
	};
	const setRefresh = () => {
		console.log(notAllRefresh);
		setNotAllRefresh((prev) => prev+1);
	}
	const notClick = (item) => {
		alert(item.id+" "+item.affected+" "+item.problem);
	}
	useEffect(() => {
		async function init() {
		const response = await fetch(
			new URL('./variables/weburl.txt', import.meta.url)
		);

		const base = await response.text();

		setUrls({
			login: base + "login",
			notAll: base + "notAll",
			set: base + "set",
			notTop1: base + "notTop1",
		});
		}

		init();
	}, []);

	 if (!urls) {
    	return <p>loading</p>;
  	}
	return(
		<div id="mainBody">		
			<UiHeader 
				intVersion={headerVersionNumber.current}/>
			{!jwtToken || !jwtToken.startsWith("ey")?(
				<>
				<UiHeaderNotLoggedIn />
				<LoginForm onLogin={handleLogin}/>
				</>
			): null}

			{jwtToken.startsWith("ey")?(
			<>
				<GetSettingsTime 
					jwtToken={jwtToken} 
					settingsUrl={urls.set} 
					settingsTime = {settingsTime}
					setSettingsTime={setSettingsTime}
				/>
				<GetNewestNotTime 	
					jwtToken={jwtToken} 
					newestNotTime={newestNotTime} 
					newestNotTimeUrl={urls.notTop1}
					setNewestNotTime={setNewestNotTime}
				/>
				<GetNotifications 
					jwtToken={jwtToken} 
					notURL={urls.notAll} 
					tableClick={notClick} notsRefresh={notAllRefresh}
				/>
				<UiFooter 
					operatorName={userData.username}
					lastSettingsUpdate={settingsTime} 
					status={status} 
					newestNotificationStartDate={newestNotTime}
				/>
			</>
			):null}
			
		</div>
	)
}

export default App
