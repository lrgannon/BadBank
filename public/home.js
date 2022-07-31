function Home() {
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
    const navCreateAccount = document.getElementById('navCreateAccount');
    const navLogin = document.getElementById('navLogin');
    const navDeposit = document.getElementById('navDeposit');
    const navWithdraw = document.getElementById('navWithdraw');
    const navBalance = document.getElementById('navBalance');
    const navAllData = document.getElementById('navAllData');
    const navLogout = document.getElementById('navLogout');

    navCreateAccount.style.display = "block";
    navLogin.style.display = "block";
    navDeposit.style.display = "none";
    navWithdraw.style.display = "none";
    navBalance.style.display = "none";
    navAllData.style.display = "none";
    navLogout.style.display = "none";
    },[])
 
  return (
    <Card
      bgcolor="light"
      txtcolor="black"
      header="Welcome to Volunteer Bank & Distrust"
      text="Think Wisely When Chosing a Bank"
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image" />)}
    />
  );  
}