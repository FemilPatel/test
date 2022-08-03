/** @format */

// /** @format */

import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { nameValidator } from "./validate";

// export default function App() {
//   const [name, setName] = useState({ value: "", error: "" });
//   //   const {
//   //     register,
//   //     handleSubmit,
//   //     watch,
//   //     formState: { errors },
//   //   } = useForm();

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const nameErr = nameValidator(name.value);
//     if (nameErr) {
//       setName({ ...name, error: nameErr });
//     } else {
//       console.log("inserted...");
//     }
//   };

//   //   console.log(watch("example")); // watch input value by passing the name of it

//   return (
//     /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
//     <form onSubmit={onSubmit}>
//       {/* register your input into the hook by invoking the "register" function */}
//       {/* <input defaultValue='test' {...register("example")} /> */}
//       <input
//         name='name'
//         value={name.value}
//         onChange={(e) => setName({ value: e.target.value, error: "" })}
//       />

//       {/* include validation with required or other standard HTML validation rules */}
//       {/* <input {...register("exampleRequired", { required: true })} /> */}
//       {/* errors will return when field validation fails  */}
//       {name.error && <span>This field is required</span>}

//       <input type='submit' />
//     </form>
//   );
// }

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 10,
      loadingState: false,
    };
  }

  componentDidMount() {
    this.refs.iScroll.addEventListener("scroll", () => {
      if (
        this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
        this.refs.iScroll.scrollHeight
      ) {
        this.loadMoreItems();
      }
    });
  }

  displayItems() {
    var items = [];
    for (var i = 0; i < this.state.items; i++) {
      items.push(<li key={i}>Item {i}</li>);
    }
    return items;
  }

  loadMoreItems() {
    this.setState({ loadingState: true });
    setTimeout(() => {
      this.setState({ items: this.state.items + 10, loadingState: false });
    }, 1500);
  }

  render() {
    return (
      <div ref='iScroll' style={{ height: "200px", overflow: "auto" }}>
        <ul>{this.displayItems()}</ul>

        {this.state.loadingState ? (
          <p className='loading'> loading More Items..</p>
        ) : (
          ""
        )}
      </div>
    );
  }
}
