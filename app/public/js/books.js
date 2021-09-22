const Counter = {
    data() {
      return {
        result: {},
        message:{},
        fullname:{},
        age:{},
        imagelink:"",
        phone:"",
        origin:"",
        dob:"",
        email:"",
        address: "",
      }
    },
    computed:{
      prettyBirthday(){
          return dayjs(this.result.dob.date).format('DD MMM YYYY');
      }
    },
      created() {
        fetch('https://randomuser.me/api/', {
          // headers: { 'Content-type': 'application/json' },
      })
      .then(response => response.json())
      .then((responseJson) => {
          console.log(responseJson);
          this.result = responseJson.results[0];
          this.fullname = this.result.name.first +" "+ this.result.name.last;
          this.age = this.result.dob.age;
          this.phone = this.result.phone;
          this.origin = this.result.location.country;
          // this.dob = this.result.dob.date;
          // this.dob = prettyBirthday();
          // this.dob = this.dob.split("T");
          // this.dob = this.dob[0];
          this.email = this.result.email;
          this.address = this.result.location.street.number +" "+ this.result.location.street.name +", "+ this.result.location.state+" "+ this.result.location.postcode
          this.imagelink = this.result.picture.large;

      })
      .catch( (error) => {
          this.message = error;
          console.error(error);
      });
    } 
}
Vue.createApp(Counter).mount('#counter')
  // const obj;
  // fetch('https://randomuser.me/api/')
  // .then(response => response.json())
  // .then(data => console.log(data.results[0]));
