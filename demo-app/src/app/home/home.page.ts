import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  constructor() {

  }

  ngOnInit(): void {

    //check password is available or not 
    if (localStorage.getItem("password") == null) {
      let set_pass_btn: any = document.querySelector("#set-pass-btn")
      set_pass_btn.style.display = "block"
      let access_pass_btn: any = document.querySelector("#access-pass-btn")
      access_pass_btn.style.display = "none"
    }

    else {
      let set_pass_btn: any = document.querySelector("#set-pass-btn")
      set_pass_btn.style.display = "none"
      let access_pass_btn: any = document.querySelector("#access-pass-btn")
      access_pass_btn.style.display = "block"
    }
    //store password in local storage

    let set_pass_btn = document.querySelector("#set-pass-btn")

    set_pass_btn.addEventListener('click', function () {
      let user_input = document.querySelector("#user-input") as HTMLInputElement

      console.log(user_input.value)
      if (user_input.value == "") {
        let error_msg: any = document.querySelector("#error-msg")
        error_msg.style.display = "block";
      }

      else {

        let error_msg: any = document.querySelector("#error-msg")
        error_msg.style.display = "none";

        localStorage.setItem('password', btoa(user_input.value))

        location.reload()


      }
    })


    //login 

    let access_btn = document.querySelector("#access-pass-btn")
    access_btn.addEventListener('click', function () {
      let real_pass = localStorage.getItem("password");
      let entered_pass: any = document.getElementById("user-input")

      console.log(real_pass, entered_pass.value)

      if (real_pass == btoa(entered_pass.value)) {
        let password_wrong: any = document.querySelector("#password-wrong");
        password_wrong.style.display = "none"

        let container: any = document.querySelector("#container")
        container.style.display = "none"

        let app_page: any = document.querySelector("#app-page")
        app_page.style.display = "block"



      }

      else {

        let password_wrong: any = document.querySelector("#password-wrong");
        password_wrong.style.display = "block"
      }

    })

    //show contact form

    let add_btn = document.querySelector("#add-btn")

    add_btn.addEventListener('click', function () {
      let contact_form: any = document.querySelector("#contact-form");
      contact_form.style.display = "block"

      let save_button: any = document.querySelector("#save-btn");
      save_button.style.display = "block"

      let add_btn: any = document.querySelector("#add-btn");
      add_btn.style.display = "none"
    })

    //save contact details in local storage
    let save_btn = document.querySelector("#save-btn");

    save_btn.addEventListener('click', function () {
      let contact_name: any = document.querySelector("#contact-name");
      let contact_number: any = document.querySelector("#contact-number");
      //In localstorage one key can hold only one value at atime but here you have to store two values so you have to store these in an 
      //object in a key value format
      if (localStorage.getItem("contact-detail") == null) {
        let contact_detail =
          [{
            name: contact_name.value,
            number: contact_number.value
          }]

        //inside setItem of the localStorage the value should be always a string so we cant pass type object directly. 
        //for this we have to use JSON.stringify() method to convert object into string
        var data = JSON.stringify(contact_detail)

        localStorage.setItem('contact-detail', data)
      }

      else {
        let stored_data = localStorage.getItem('contact-detail')
        //to get the data in array format you have to use JSON.parse()
        let parsed_stored_data = JSON.parse(stored_data);

        let object =
        {
          name: contact_name.value,
          number: contact_number.value
        }

        parsed_stored_data.push(object);

        var store = JSON.stringify(parsed_stored_data)

        localStorage.setItem('contact-detail', store)
      }



      let save_button: any = document.querySelector("#save-btn");
      save_button.style.display = "none"

      let add_btn: any = document.querySelector("#add-btn");
      add_btn.style.display = "block"

      let contact_form: any = document.querySelector("#contact-form");
      contact_form.style.display = "none"

      let ion_item = document.createElement("ion-item");
      document.querySelector("#app-page").append(ion_item)

      let ion_button = document.createElement("ion-button");
      ion_button.slot = "end";
      ion_button.color = "success";
      ion_button.style.width = "30px";
      ion_button.style.height = "30px";
      ion_button.shape = "round";
      ion_button.href = "tel:" + contact_number

      ion_item.append(ion_button)

      let ion_icon = document.createElement("ion-icon")
      ion_icon.name = "call";
      ion_button.append(ion_icon)

      let ion_label = document.createElement("ion-label");
      ion_item.append(ion_label)

      let h3 = document.createElement("h3");
      h3.innerHTML = contact_name.value;
      ion_label.append(h3)

      let p = document.createElement("p");
      p.innerHTML = contact_number.value;
      ion_label.append(p)



    })

    //show contacts 

    let all_contacts = localStorage.getItem('contact-detail')
    let contacts = JSON.parse(all_contacts)

    for (let i = 0; i < contacts?.length; i++) {
      let name = contacts[i].name;
      let number = contacts[i].number;

      let ion_item = document.createElement("ion-item");
      document.querySelector("#app-page").append(ion_item)

      let ion_button = document.createElement("ion-button");
      ion_button.slot = "end";
      ion_button.color = "success";
      ion_button.style.width = "30px";
      ion_button.style.height = "30px";
      ion_button.shape = "round";
      ion_button.href = "tel:" + number

      ion_item.append(ion_button)

      let ion_icon = document.createElement("ion-icon")
      ion_icon.name = "call";
      ion_button.append(ion_icon)

      let ion_label = document.createElement("ion-label");
      ion_item.append(ion_label)

      let h3 = document.createElement("h3");
      h3.innerHTML = name;
      ion_label.append(h3)

      let p = document.createElement("p");
      p.innerHTML = number;
      ion_label.append(p)


    }


  }

  ngAfterViewInit() {

  }








}
