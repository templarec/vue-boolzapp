/*$(document).ready(function () {

});*/
var app = new Vue({
	el: '#root',
	data: {
		contacts: [
			{
				name: 'Michele',
				avatar: '_1',
				visible: true,
				messages: [
					{
						date: '10/01/2020 15:30:55',
						text: 'Hai portato a spasso il cane?',
						status: 'sent'
					},
					{
						date: '10/01/2020 15:50:00',
						text: 'Ricordati di dargli da mangiare',
						status: 'sent'
					},
					{
						date: '10/01/2020 16:15:22',
						text: 'Tutto fatto!',
						status: 'received'
					}
				],
				lastMessage: '', //ultimo messaggio inserito
				timeStampLs: '', //timestamp ultimo messaggio
				count: 3 //numero messaggi
			},
			{
				name: 'Fabio',
				avatar: '_2',
				visible: true,
				messages: [
					{
						date: '10/01/2020 15:30:55',
						text: 'Ciao come stai?',
						status: 'sent'
					},
					{
						date: '10/01/2020 15:35:55',
						text: 'Bene grazie! Stasera ci vediamo?',
						status: 'received'
					},
					{
						date: '10/01/2020 15:37:55',
						text: 'Mi piacerebbe ma devo andare a fare la spesa.',
						status: 'sent'
					}
				],
				lastMessage: '',
				timeStampLs: '',
				count: 3
			},
			{
				name: 'Samuele',
				avatar: '_3',
				visible: true,
				messages: [
					{
						date: '10/01/2020 22:37:55',
						text: 'La Marianna va in campagna',
						status: 'received'
					},
					{
						date: '10/01/2020 23:37:55',
						text: 'Sicuro di non aver sbagliato chat?',
						status: 'sent'
					},
					{
						date: '11/01/2020 00:37:55',
						text: 'Ah scusa!',
						status: 'received'
					}
				],
				lastMessage: '',
				timeStampLs: '',
				count: 3
			},
			{
				name: 'Luisa',
				avatar: '_6',
				visible: true,
				messages: [
					{
						date: '10/01/2020 15:30:55',
						text: 'Lo sai che ha aperto una nuova pizzeria?',
						status: 'sent'
					},
					{
						date: '10/01/2020 15:50:00',
						text: 'Si, ma preferirei andare al cinema',
						status: 'received'
					}
				],
				lastMessage: '',
				timeStampLs: '',
				count: 2
			},
		], //dati utenti e messaggi
		currentContact: 0, //indice contatto selezionato
		newMessage: '', //bind per nuovo messaggio
		cercaUtente: '', //bind per ricerca utente
		showWindow: false, //finestra per delete messaggi
		light: true, //modalit?? giorno o notte
		mode: true, //true mobile
		currentMsg: ''

	},
	computed: {

	},
	methods: {
		//prende ultimo messaggio da visualizzare come preview
		getLastMessage: function (nome) {
			this.contacts.forEach((element)=>{
				if (element.name === nome) {
					let lunghezza =element.messages.length;
					element.lastMessage = element.messages[lunghezza - 1 ].text;
					//prendo il timestamp
					element.timeStampLs = dayjs(element.messages[lunghezza-1].date).format('HH:mm');
				}
			})
		},
		//seleziona contatto e fa vedere la chat
		selectContact: function (nome) {
			this.contacts.forEach((item,index)=> {
				if (nome === item.name){
					this.currentContact = index;
				}
			})
			//se il device ?? pi?? piccolo di 721 nascondo side bar e mostro
			//main
			if (window.screen.width < 721) {
				let sidebar = $('nav');
				let mainchat = $('main')
				sidebar.hide();
				mainchat.show();

			}
		},
		//tasto indietro
		goBack: function () {
			let sidebar = $('nav');
			let mainchat = $('main')
			sidebar.show();
			mainchat.hide();
		},
		//invio nuovo messaggio
		sendMessage: function (chat, messaggio){
			this.contacts.forEach((item,index)=>{
				if (index === chat && messaggio !=='') {
					let newMessageObj = {
						date: dayjs(),
						text: messaggio,
						status: 'sent'
					}
					item.messages.push(newMessageObj);
					item.count++;
					//messaggio automatico
					setTimeout(()=> {
						let newMessageObj = {
							date: dayjs(),
							text: 'Ok!',
							status: 'received'
						}
						item.messages.push(newMessageObj);
						item.count++;
					},1000)
				}
			})
			this.newMessage = '';

		},
		//estrae ora da un messaggio
		getTime: function (data) {
			return dayjs(data).format('HH:mm');
		},
		//ricerca utente normalizza a minuscolo
		searchUser: function (user1,user2) {
			user1 = user1.toLowerCase();
			user2 = user2.toLowerCase();
			if (user1.includes(user2))
				return true;
		},
		//visualizza con tasto destro menu delete message
		showMsgMenu: function (index) {
			if (this.showWindow) {
				this.showWindow = false;
			} else {
				this.showWindow = true;
				this.currentMsg = index;
			}
		},
		//cancella messaggio
		deleteMsg: function (indice,messaggio) {
			if (this.contacts[indice].messages.length > 0) {
				this.contacts[indice].messages.forEach((item, index) => {
					if (item.text === messaggio) {
						this.contacts[indice].count = this.contacts[indice].messages.length - 1
						this.contacts[indice].messages.splice(index, 1);
					}
				})
			}

		}
	}
});
//automatismo per light o dark mode
setInterval(() => {
	let currentTime = dayjs(); //crea data di adesso
	let darkStart = currentTime.set('hour', 18).set('minute', 0); //set ore 18 alla data generata prima
	let darkEnd = currentTime.set('hour', 6).set('minute', 0); //set ore 06 alla data generata prima
	console.log(currentTime.format("HH:mm"), darkStart.format("HH:mm"), darkEnd.format("HH:mm"))
	//se la data di adesso ?? dopo le 18 OPPURE prima delle 06
	//attiva dark mode
	if (currentTime.isAfter(darkStart) || currentTime.isBefore(darkEnd)) {
		app.light = false;
	} else {
		app.light = true;
	}
	//controllo dimensioni device e setto variabile app.mode di conseg
	if (window.screen.width < 721) {
		app.mode = true;
	} else {
		app.mode = false;
		let mainchat = $('main')
		mainchat.show(); //se pi?? grande faccio vedere il main
	}

}, 200)// check ogni 200ms

