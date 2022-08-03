/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useForm } from "react-hook-form";

const AddUser = () => {
  let history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageValidate = {
    lessThan10MB: (files) => files[0]?.size < 10000000 || "Max 10MB",
    acceptedFormats: (files) =>
      ["image/jpeg", "image/png", "image/gif"].includes(files[0]?.type) ||
      "Only PNG, JPEG e GIF",
  };

  const [Imgs, setImgs] = useState(null);
  // const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    id: Math.floor(Math.random() * 100000),
    name: "",
    dob: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    gender: "",
    country: "",
    // image: "",
  });

  const { name, dob, username, email, phone, website, gender, country } = user;

  const calAge = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const onInputChange = (e) => {
    let age = calAge(dob);
    setUser({ ...user, [e.target.name]: e.target.value, age: age });
  };
  const uploadImage = async (e) => {
    let file = e.target.files[0];
    let base64 = null;
    base64 = await convertBase64(file);
    setUser({ ...user, image: base64 });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // const valiadate = () => {
  //   var pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  //   var re = /\S+@\S+\.\S+/;
  //   var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  //   if (!name || name.length <= 0) {
  //     // alert("Please Enter Valid Name");
  //     let nameErr = "Please Enter Valid Name";
  //     setErrors({ ...errors, name: nameErr });
  //   } else if (!dob || dob.length <= 0) {
  //     let dobErr = "Please Enter Valid Date of birth";
  //     setErrors({ ...errors, dob: dobErr });
  //   } else if (!username || username.length <= 0) {
  //     let userNameErr = "Please Enter Valid UserName";
  //     setErrors({ ...errors, username: userNameErr });
  //   } else if (!email || email.length <= 0) {
  //     let emailErr = "Please Enter Valid Email";
  //     setErrors({ ...errors, email: emailErr });
  //   } else if (!phone || phone.length <= 0) {
  //     let phoneErr = "Please Enter Valid Phone";
  //     setErrors({ ...errors, phone: phoneErr });
  //   } else if (!website || website.length <= 0) {
  //     let websiteErr = "Please Enter Valid WebSite";
  //     setErrors({ ...errors, website: websiteErr });
  //   } else {
  //     return false;
  //   }
  // };

  const onSubmit = async (e) => {
    // e.preventDefault();

    // if (valiadate() === undefined) {
    //   // setErrors(null);
    //   return true;
    // } else {
    await axios.post("http://localhost:3003/users", user);
    history("/");
    // }
  };
  return (
    <div className='container'>
      <div className='w-75 mx-auto shadow p-5'>
        <h2 className='text-center mb-4'>Add A User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control form-control-lg'
              placeholder='Enter Your Name'
              name='name'
              value={name}
              {...register("name", { required: true })}
              onChange={onInputChange}
            />
            {errors.name && (
              <span style={{ color: "red" }}>Please Enter Valid Name</span>
            )}
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control form-control-lg'
              placeholder='Enter Your Date of Birth'
              name='dob'
              value={dob}
              onChange={onInputChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              className='form-control form-control-lg'
              placeholder='Enter Your Username'
              name='username'
              value={username}
              {...register("username", { required: true })}
              onChange={onInputChange}
            />
            {errors.username !== undefined && (
              <span style={{ color: "red" }}>Please enter valid username</span>
            )}
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control form-control-lg'
              placeholder='Enter Your E-mail Address'
              name='email'
              autoComplete='off'
              value={email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
              onChange={onInputChange}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email.message}</span>
            )}
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control form-control-lg'
              placeholder='Enter Your Phone Number'
              name='phone'
              autoComplete='off'
              value={phone}
              {...register("phone", {
                required: true,
                pattern: /^[0-9+-]+$/,
                minLength: 6,
                maxLength: 12,
              })}
              onChange={onInputChange}
            />
            {errors.phone !== undefined && (
              <span style={{ color: "red" }}>
                Please enter valid mobile number
              </span>
            )}
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control form-control-lg'
              placeholder='Enter Your Website Name'
              name='website'
              value={website}
              autoComplete='off'
              onChange={onInputChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='radio'
              value='Male'
              name='gender'
              checked={gender === "Male"}
              {...register("gender", { required: true })}
              onChange={onInputChange}
            />
            {`\t`} Male{`\t`}
            <input
              type='radio'
              value='Female'
              name='gender'
              checked={gender === "Female"}
              {...register("gender", { required: true })}
              onChange={onInputChange}
            />
            {`\t`} Female
            <div>
              <span style={{ color: "red" }}>
                {errors.gender?.type === "required" &&
                  "Tell us what is your gender"}
              </span>
            </div>
          </div>
          <div className='form-group'>
            <select
              name='country'
              id='country'
              className='form-control form-control-lg'
              placeholder='country'
              value={country}
              {...register("country", { required: true })}
              onChange={onInputChange}>
              <option name=' ' value=''>
                {" "}
                Select Country{" "}
              </option>
              <option name='India' value='India'>
                India
              </option>
              <option name='United Kindom' value='United Kindom'>
                United Kindom
              </option>
              <option name='America' value='America'>
                America
              </option>
              <option name='Canada' value='Canada'>
                Canada
              </option>
              <option name='Germany' value='Germany'>
                Germany
              </option>
            </select>
            {errors.country && (
              <span style={{ color: "red" }}>Select your Country</span>
            )}
          </div>
          <div className='form-group'>
            <input
              type='file'
              className='form-control form-control-lg'
              placeholder='upload'
              name='image'
              // value={imgs}
              {...register("image", {
                required: {
                  value: true,
                  message: "your image is required.",
                },
                validate: imageValidate,
              })}
              onChange={uploadImage}
            />
            {errors.image && (
              <span style={{ color: "red" }}>{errors.image.message}</span>
            )}
          </div>

          <button className='btn btn-primary btn-block'>Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
