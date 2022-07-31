i//mport 'styles.css';

function NavBar() {
  const ctx = React.useContext(UserContext);
  const history = ReactRouterDOM.useHistory();
  const [user, setUser]=React.useState('');

  const handleLogout = () => {
    firebase.auth().signOut();
    setUser(null);
    localStorage.clear();
    history.push("/");
  };
  
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{position: 'right', paddingBottom: '20px'}}>
      <div class="container-fluid">
      <a className="navbar-brand"  href="#"><img 
        src="BadBanklogo.jpeg"
        width="30"
        height="30"
        className="d-inline-block align-top"alt="  Bank logo" href="#"/>VOLUNTEER BANK & DISTRUST</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse"  style={{paddingLeft:"750px"}} id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item" id="navCreateAccount">
            <a className="nav-link"  href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item" id="navLogin">
            <a className="nav-link" href="#/login/">Login</a>
          </li>
          <li className="nav-item" id="navDeposit">
            <a className="nav-link"  href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item"  id="navWithdraw">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item"  id="navBalance">
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item"  id="navAllData">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li> 
          <li className="nav-item" id='navLogout'>
                    <a className="nav-link" 
                      onClick={handleLogout} href="#">
                      <span className="logout" title="Logout">Logout</span>
                    </a>
                  </li>
         
        </ul>
      </div>
      </div>
    </nav>
    </>
  );
  }
  
  