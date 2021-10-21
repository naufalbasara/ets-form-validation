const form = document.querySelector("#form"),
  formControl = document.querySelectorAll(".form-control"),
  valid = {
    nama: true,
    harga: true,
    jenis: true,
    kode: true,
  },
  error = (obj) => {
    obj.style.border = "1px solid red";
    obj.style.color = "red";
  },
  solve = (obj) => {
    obj.style.border = "";
    obj.style.color = "";
  };

const validate = () => {
  for (let input of formControl) {
    // cek nama barang
    if (input.classList.contains("barang")) {
      if (input.value.length < 10 || input.value == "") {
        error(input);
        input.placeholder = "Nama barang minimal 10 karakter";
        valid["nama"] = false;
      } else {
        solve(input);
        valid["nama"] = true;
      }
    }

    // cek harga barang
    let numberValidator = /^[0-9]+$/;
    if (input.classList.contains("harga")) {
      const number = parseInt(input.value);
      if (!numberValidator.test(input.value) || input.value == "" || number < 5000) {
        error(input);
        input.placeholder = "Harga barang minimal 5000";
        valid["harga"] = false;
      } else {
        solve(input);
        valid["harga"] = true;
      }
    }

    // cek jenis barang
    if (input.classList.contains("jenis")) {
      if (input.value == "Default") {
        error(input);
        valid["jenis"] = false;
      } else {
        solve(input);
        valid["jenis"] = true;
      }
    }

    // cek kode barang
    if (input.classList.contains("kode")) {
      if (!input.value.match(numberValidator) || input.value == "" || input.value.length < 10) {
        error(input);
        input.placeholder = "Kode harus angka dan minimal 10 digit";
        valid["kode"] = false;
      } else {
        solve(input);
        valid["kode"] = true;
      }
    }
  }

  for (const key in valid) {
    if (valid[key] == false) {
      return false;
    }
  }
  return true;
};

// submit form
form.addEventListener("submit", (event) => {
  if (validate() == false) {
    Swal.fire({
      icon: "error",
      title: "ERROR",
      text: "Please fill the form according to the proper requirements",
    });
    event.preventDefault();
  } else {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure you want to submit the form?",
      text: "You won't be able to cancel this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Submitted!", "Form has been submitted", "success").then(() => {
          form.submit();
        });
      }
    });
  }
});
