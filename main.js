let priceText = document.querySelector("#priceText");
let persian = /^[\u0600-\u06FF\s]+$/;
let RialToToman = (price) => price / 10;

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
submit.addEventListener("click", (e) => {
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

Name.addEventListener("blur", (e) => {
  alertname.classList.remove("show");
  Name.classList.remove("border-danger");
});
LastName.addEventListener("blur", (e) => {
  alertlastname.classList.remove("show");
  LastName.classList.remove("border-danger");
});
PhoneNumber.addEventListener("blur", (e) => {
  alertphonenumber.classList.remove("show");
  PhoneNumber.classList.remove("border-danger");
});
payValue.addEventListener("blur", (e) => {
  alertpayvalue.classList.remove("show");
  payValue.classList.remove("border-danger");
});
payValue.addEventListener("input" , ()=>{
  priceText.innerHTML = `${formatMoney(RialToToman(payValue.value) , 0 , "," , ".")} تومان`;
})

function formatMoney(n, c, d, t) {
  var c = isNaN(c = Math.abs(c)) ? 0 : c,
    d = d == undefined ? "," : d,
    t = t == undefined ? "." : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return (
    s +
    (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
    (c
      ? d +
        Math.abs(n - i)
          .toFixed(c)
          .slice(2)
      : "")
  );
}

function addAlert(item , alert , alertText){
  item.classList.add("border-danger");
  alert.classList.add("show");
  alert.innerHTML = alertText;
}