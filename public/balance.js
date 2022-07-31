
function Balance(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [balance, setBalance] = React.useState('');
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
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
    },[])

  return (
    <>
    <div className="welcome" style={{textAlign:"right", textTransform:"uppercase", paddingRight:"100px"}}>Welcome, {ctx.user}</div>
    <Card
      bgcolor="light"
      txtcolor="black"
      header="Balance"
      body={show ? (
        <BalanceForm 
        user={props.user}
        setShow={setShow} 
        setStatus={setStatus}
        setBalance={setBalance}
        /> 
      ):(
        <>
        <BalanceMsg 
        setShow={setShow}
        setStatus={setStatus}
        />
        <h4>Account Balance: ${balance}</h4>
      </>
      )
      }
    />
  </>
  )
}

function BalanceMsg(props){
  return(
  <>
    
    <button 
      type="submit" 
      className="btn btn-success" 
      onClick={() => {
                     props.setShow(true)
                     props.setStatus('');
        }}>
      Check Balance Again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);  

  function handleBalance(){
 
    fetch(`/account/findOne/${ctx.email}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text)
        props.setStatus(data.balance)
        props.setShow(false)
        props.setBalance(data.balance)
        console.log('JSON:', data)
        setTimeout(() => setStatus(''), 3000);
      } catch (err) {
        props.setStatus(text)
        console.log('err:', text)
      }
    })
  }

  return (<>

    <button type="submit" 
      className="btn btn-success" 
      onClick={handleBalance}>
        Check Balance
    </button>

  </>);
}