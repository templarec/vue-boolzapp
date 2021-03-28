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
				lastMessage: '',
				timeStampLs: '',
				count: 3
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
		],
		currentContact: 0,
		newMessage: '',
		cercaUtente: '',
		showWindow: false,
		light: true
	},
	computed: {

	},
	methods: {
		getLastMessage: function (nome) {
			this.contacts.forEach((element)=>{
				if (element.name === nome) {
					let lunghezza =element.messages.length;
					element.lastMessage = element.messages[lunghezza - 1 ].text;
					element.timeStampLs = dayjs(element.messages[lunghezza-1].date).format('HH:mm');
				}
			})
		},
		selectContact: function (nome) {
			this.contacts.forEach((item,index)=> {
				if (nome === item.name){
					this.currentContact = index;
				}
			})
		},
		sendMessage: function (chat, messaggio){
			this.contacts.forEach((item,index)=>{
				if (index === chat) {
					let newMessageObj = {
						date: dayjs(),
						text: messaggio,
						status: 'sent'
					}
					item.messages.push(newMessageObj);
					item.count++;
					setTimeout(()=> {
						let newMessageObj = {
							date: dayjs(),
							text: 'ok',
							status: 'received'
						}
						item.messages.push(newMessageObj);
						item.count++;
					},1000)
				}
			})
			this.newMessage = '';

		},
		getTime: function (data) {
			return dayjs(data).format('HH:mm');
		},
		searchUser: function (user1,user2) {
			user1 = user1.toLowerCase();
			user2 = user2.toLowerCase();
			if (user1.includes(user2))
				return true;
		},
		showMsgMenu: function () {
			if (!this.showWindow) {
				this.showWindow = true;
			} else {
				this.showWindow = true;
			}
		},
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
setInterval(() => {
	let currentTime = dayjs();
	let darkStart = currentTime.set('hour', 18).set('minute', 0);
	let darkEnd = currentTime.set('hour', 0).set('minute', 0);
	console.log(currentTime.format("HH:mm"), darkStart.format("HH:mm"), darkEnd.format("HH:mm"))
	if (currentTime.isAfter(darkStart) || currentTime.isBefore(darkEnd)) {
		app.light = false;
	} else {
		app.light = true;
	}
}, 200)

