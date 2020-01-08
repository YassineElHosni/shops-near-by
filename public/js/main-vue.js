window.onload = init;
function init() {
	Vue.use(VueMaterial.default);
	new Vue({
		el: "#main",
		data: {
			message: "empty",
			email:"",
			password:"",
			new_email:"",
			new_password:"",
			signup_url: "/signup"
		},
		methods: {
			clearInput(){
				this.new_email = "";
				this.new_password = "";
			},
			displayMessage(message, error=false){
				this.clearInput();
				if(error){
					document.querySelector(".error-msg").style.display="block";
					document.querySelector(".error-msg").innerHTML = message;
					document.querySelector(".success-msg").style.display="none";
				}else{
					document.querySelector(".success-msg").style.display="block";
					document.querySelector(".success-msg").innerHTML = message;
					document.querySelector(".error-msg").style.display="none";
				}
			},
			signup(){
				console.log("signing up as "+this.new_email+" "+this.new_password);
				let form_data = new FormData();
				form_data.append("email", this.new_email);
				form_data.append("password",  this.new_password);

				fetch(this.signup_url, {method:"POST", body:form_data}).then(response => {
					return response.json();
				}).then(response => {
					if(response.error){
						this.displayMessage(response.message, true);
					}else {
						this.displayMessage(response.message);
						// TODO: display sign in form
					}
				});
			}
		}
	});
};