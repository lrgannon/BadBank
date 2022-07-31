function Deposit() {
  const[balance, setBalance] = React.useState("");
  const [disabled, setDisabled]= React.useState(true);
  const [show, setShow] = React.useState(true);
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
      bgcolor="light"
      txtcolor="black"
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <DepositMessage setShow={setShow} setStatus={setStatus}/>
        )
      }/>
    </>
  );
  
  function DepositForm(props) {
    const [deposit, setDeposit] = React.useState("");
  
    function handleDeposit() {
      if (!validate(Number(deposit))) return;
  
      fetch(`/account/update/${ctx.email}/${deposit}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setStatus(JSON.stringify(data.amount));
          props.setShow(false);
          console.log('JSON:', data);
        } catch(err) {
          props.setStatus('Deposit failed')
          console.log('err:', text);
        }
      });
      setBalance(balance + Number(deposit));
      setShow(false);
    }
  
    return (
      <>
        <div className="balance-info">Account Balance
         ${balance} 
         </div>
        <br />
        <br />
        Deposit Amount
        <input
          type="input"
          className="form-control"
          id="deposit"
          placeholder="Deposit Amount"
          value={deposit}
          onChange={(e) => {
            setDeposit(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <button
          type="submit"
          className="btn btn-success"
          onClick={handleDeposit}
          disabled={disabled}
      
        >Deposit</button>
      </>
    );
  }
  
  function DepositMessage(props) {
    return (
      <>
        <span className="balance-info">Account Balance ${balance}</span>
        <br />
        <br />
        <h5>Successful Deposit</h5>
        <button
          type="submit"
          className="btn btn-success"
          onClick={() => {props.setShow(true); props.setStatus('');}}
        >Deposit Again</button>
      </>
    );
  }
  
  function validate(deposit) {
    if (isNaN(deposit)) {
      setStatus("Did not enter a valid number");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (deposit < 1) {
      setStatus("Lowest deposit amount is $1");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
  }
        