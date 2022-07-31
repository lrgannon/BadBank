function Withdraw() {
  const[balance, setBalance] = React.useState("");
  const [show, setShow] = React.useState(true);
  const [disabled, setDisabled]= React.useState(true);

  const [status, setStatus] = React.useState("");
  const ctx = React.useContext(UserContext);
  
  React.useEffect(() => {
    fetch(`/account/findOne/${ctx.email}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text)
        setBalance(data.balance)
        console.log('JSON:', data)
      } catch (err) {
        console.log('err:', text)
      }
    })
  })
  
  return (
    <>
    <div className="welcome" style={{textAlign:"right", textTransform:"uppercase", paddingRight:"100px"}}>Welcome, {ctx.user}</div>
    <Card
      txtcolor="black"
      bgcolor="light"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <WithdrawMessage setShow={setShow} setStatus={setStatus}/>
        )
      }/>
    </>
  );
  
  function WithdrawForm(props) {
    const [withdraw, setWithdraw] = React.useState("");
  
    function validate(withdraw) {
      if (isNaN(withdraw)) {
        setStatus("Did not enter a valid number");
        setTimeout(() => setStatus(""), 3000);
        return false;
    }
    if (withdraw > balance) {
      setStatus("Insuffienct funds");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
      if (withdraw < 1) {
        setStatus("Withdrawl cannot be a negative number");
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      return true;
    }
    
    function handleWithdraw() {
      
      if (!validate(Number(withdraw))) return;
  
      fetch(`/account/update/${ctx.email}/-${Number(withdraw)}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setStatus(JSON.stringify(data.amount));
          props.setShow(false);
          console.log('JSON:', data);
        } catch(err) {
          props.setStatus('Withdrawl failed')
          console.log('err:', text);
        }
      });
      setBalance(balance - (withdraw));
      setShow(false);
    }
  
    return (
      <>
        <span className="balance-info">Account Balance
         ${balance} 
         </span>
        <br />
        <br />
        Withdrawl Amount
        <input
          type="input"
          className="form-control"
          id="withdraw"
          placeholder="Withdrawl Amount"
          value={withdraw}
          onChange={(e) => {
            setWithdraw(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <button
          type="submit"
          className="btn btn-danger"
          onClick={handleWithdraw}
          disabled={disabled}
        >Withdraw</button>
      </>
    );
  }
  
  function WithdrawMessage(props) {
    return (
      <>
        <span className="balance-info">Account Balance ${balance}</span>
        <br />
        <br />
        <h5>Successful Withdrawl</h5>
        <button
          type="submit"
          className="btn btn-danger"
          onClick={() => {props.setShow(true); props.setStatus('');}}
        >Withdraw Again</button>
      </>
    );
  } 
}