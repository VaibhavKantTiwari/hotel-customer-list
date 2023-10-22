      var customers = [];
      const capacity = 25;
      let seatsLeft = 25;
      let inputcount = React.createRef();
      let inputguestname = React.createRef();
      let inputnumber = React.createRef();
      const hashmap = new Map();


      // Create form submit handler here
      function handlesummit(event){
        event.preventDefault();
        if(inputguestname.current.value==""){
          alert("name is importent");
          rootElement.render(<App />);
        }
        else if(hashmap.has(inputguestname.current.value)){
          alert("Customer already exists");
          rootElement.render(<App />);

        }
        else if(inputcount.current.value<=seatsLeft){
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString();
        let obj = new Object();
        hashmap.set(inputguestname.current.value, 1);
        obj.guestno = inputcount.current.value;
        obj.guestname = inputguestname.current.value;
        obj.no = inputnumber.current.value;
        // var tm = new Date();
        
        obj.checkin = formattedTime;
        obj.del = true;
        obj.checkout = "-";
        obj.status = <><button onClick = {(e) => change(obj)}>Click to checkout</button></>;
        customers.unshift(obj);
        seatsLeft = seatsLeft-Number(inputcount.current.value);
        rootElement.render(<App />);

        }
        else{
          alert("Guest count exceeds capacity");
          rootElement.render(<App />);
        }
        

      }
      const change = (x) =>{
        x.status = "served";
        x.del = false;
        hashmap.delete(x.guestname);
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString();
        x.checkout = formattedTime;
        seatsLeft = seatsLeft+Number(x.guestno);
        rootElement.render(<App />);        
      }
      const delte = (x, idx) =>{
        customers.splice(idx, 1);
        hashmap.delete(x.guestname);
        if(x.del==true){
          seatsLeft = seatsLeft+Number(x.guestno);
        }
        rootElement.render(<App />);

        
      }
      const App = () => (
        <div className="App" style={{ textAlign: "center" }}>
          <div>
            <h2>Total Capacity:{capacity} </h2>
            <h2>Seats Left:{seatsLeft} </h2>
          </div>

          <form onSubmit = {handlesummit}>
            <input  ref ={inputcount} type = "number" min = "0" step = "1" placeholder = "Guests Count"/>
            <input ref ={inputguestname} type= "text" placeholder = "Primary Guest Name"/>
            <input ref ={inputnumber} placeholder = "Phone Number"/>
            <button>Add Entry</button>

          </form>
          <table border = "1">
            <thead>
                <tr>
                    <th>Count</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Status</th>
                    <th>Remove Entry</th>
                </tr>
            </thead>
            <tbody>
              {
                customers.map((elem, idx)=>(
                  <tr key = {idx}>
                    <td>{elem.guestno}</td>
                    <td>{elem.guestname}</td>
                    <td>{elem.no}</td>
                    <td>{elem.checkin}</td>
                    <td>{elem.checkout}</td>
                    <td>{elem.status}</td>
                    <td><><button onClick = {(e) => delte(elem, idx)}>Delete</button></></td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          {/* Complete table to show records of customers */}
          {/* <table border="1px" style={{ margin: "auto" }}></table> */}
        </div>
      )

      const rootElement = ReactDOM.createRoot(document.getElementById("root"));
      rootElement.render(<App />);