function AllData() {
    const [data, setData] = React.useState([]);
    const[loaded, setLoaded] = React.useState(false);
  
    React.useEffect(() => {
     
      fetch('/account/all')
        .then(response => response.json())
        .then(data => {
       
          setData(data);
        })
      setLoaded(true);
  
      const navCreateAccount = document.getElementById('navCreateAccount');
      const navLogin = document.getElementById('navLogin');
      const navDeposit = document.getElementById('navDeposit');
      const navWithdraw = document.getElementById('navWithdraw');
      const navBalance = document.getElementById('navBalance');
      const navAllData = document.getElementById('navAllData');
      const navLogout = document.getElementById('navLogout');
      
      navCreateAccount.style.display = "none";
      navLogin.style.display = "none";
      navDeposit.style.display = "block";
      navWithdraw.style.display = "block";
      navBalance.style.display = "block";
      navAllData.style.display = "block";
      navLogout.style.display = "block";
    }, [loaded]);
    
    return (
    
     <div>
          {loaded ? ((data.map((user, index) => {
              return (
                <Card
                txtcolor="black"
                bgcolor="light"
                title={`ACCOUNT HOLDER: ${user.name.toUpperCase()}`} 
                key={user._id}
                body={   
             <ul className="user-list" key={index}>
             <li className="allData mongodb-ID" >MongoDB ID{user._id}</li>
             <li className="allDataemail">Email: {user.email}</li>
             <li className="allDatapassword">Password: {user.password}</li>
              <li className="allDatabalance">Balance: ${user.balance}</li>
             </ul>
                }
             />
              );
            })))
            : 
            ("...loading")
          }
        </div>
        )
      }