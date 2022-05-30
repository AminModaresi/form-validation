let priceText = document.querySelector("#priceText");
let persian = /^[\u0600-\u06FF\s]+$/;
let RialToToman = (price) => price / 10 ;
let form = document.querySelector("#pay");
// input
let Name = document.querySelector("input[name='name']");
let LastName = document.querySelector("input[name='lastname']");
let PhoneNumber = document.querySelector("input[name='phonenumber']");
let payValue = document.querySelector("input[name='payValue']");
let submit = document.querySelector("input[type=submit]");

// alert
let alertname = document.querySelector("#alert-name");
let alertlastname = document.querySelector("#alert-lastname");
let alertphonenumber = document.querySelector("#alert-phonenumber");
let alertpayvalue = document.querySelector("#alert-payValue");
form.addEventListener("submit", (e) => {
  let valid = true;
  e.preventDefault();
  RemoveAllAlert();
  if (Name.value.trim() == "") {
    addAlert(Name , alertname , 'نام را وارد کنید');
    valid = false;
  } else if (!persian.test(Name.value)) {
    addAlert(Name , alertname , 'نام نمی تواند شامل حروف انگلیسی باشد');
    valid = false;
  } else {
    Name.classList.add("border-success");
  }

  if (LastName.value.trim() == "") {
    addAlert(LastName , alertlastname , 'نام خانوادگی را وارد کنید');
    valid = false;
  } else if (!persian.test(LastName.value)) {
    addAlert(LastName , alertlastname , 'نام  نمی تواند شامل حروف انگلیسی باشد');
    valid = false;
  } else {
    LastName.classList.add("border-success");
  }

  if (PhoneNumber.value.trim() == "" || isNaN(PhoneNumber.value)) {
    addAlert(PhoneNumber , alertphonenumber , 'شماره تلفن اجباری است');
    valid = false;
  }else if(PhoneNumber.value.length != 11){
    addAlert(PhoneNumber , alertphonenumber , 'شماره تلفن باید 11 رقم باشد');
    valid = false;
  } else {
    PhoneNumber.classList.add("border-success");
  }

  if(payValue.value.trim() == ""){
    addAlert(payValue , alertpayvalue , 'مبلغ را وارد کنید');
    valid = false;
  }else if(payValue.value < 100000){
    addAlert(payValue , alertpayvalue , 'مبلغ باید بیشتر از 100,000 ریال باشد');
  }else{
    payValue.classList.add("border-success");
  }
  if (valid){
    alert("All Ok");
  }
});

function RemoveAllAlert() {
  alertname.classList.remove("show");
  alertlastname.classList.remove("show");
  alertphonenumber.classList.remove("show");
  alertpayvalue.classList.remove("show");
  Name.classList.remove("border-danger");
  LastName.classList.remove("border-danger");
  PhoneNumber.classList.remove("border-danger");
  payValue.classList.remove("border-danger");
}

Name.addEventListener("blur", () => {
  alertname.classList.remove("show");
  Name.classList.remove("border-danger");
});
LastName.addEventListener("blur", () => {
  alertlastname.classList.remove("show");
  LastName.classList.remove("border-danger");
});
PhoneNumber.addEventListener("blur", () => {
  alertphonenumber.classList.remove("show");
  PhoneNumber.classList.remove("border-danger");
});
payValue.addEventListener("blur", () => {
  alertpayvalue.classList.remove("show");
  payValue.classList.remove("border-danger");
});
payValue.addEventListener("input" , ()=>{
  priceText.innerHTML = `${formatMoney(RialToToman(payValue.value))} تومان`;
})

function formatMoney(money){
  money = money.toString().includes(".") ? money.toString().slice(0, money.toString().indexOf(".")) : money.toString();
  return money.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function addAlert(item , alert , alertText){
  item.classList.add("border-danger");
  alert.classList.add("show");
  alert.innerHTML = alertText;
}