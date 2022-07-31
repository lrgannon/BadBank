function Login(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [disabled, setDisabled] = React.useState(true);
  const [user, setUser] = React.useState('');  
  const ctx = React.useContext(UserContext);

  return (

    <Card
      bgcolor="light"
      txtcolor="black"
      header="Login"
      status={status}
      body={show ? (
        <LoginForm setUser={props.setUser} setShow={setShow} setStatus={setStatus}/>
        ):(
        <LoginMsg setShow={setShow} setStatus={setStatus}/>
        )
      }
  
  />
 
  ) 

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
 <a href="#/balance/">
   <button
   type="submit"
   className="btn btn-info"
   onClick={() => props.setShow(true)}
   >My Balance</button>
 </a>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleLogin(){

    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(
      email,
      password
    );
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log(firebaseUser);
        fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            setShow(false);
            setUser(data.name);
            ctx.user = data.name;
            ctx.email = data.email;
            console.log('JSON:', data);
        } catch(err) {
            setStatus(text)
            setShow(false)
            console.log('err:', text);
        }
    });
      } else {
       
       setStatus("Please use valid email and password");   
                setTimeout(() => setStatus(""), 3000);
      }
    });
    promise.catch((e) => console.log(e.message));
  }

  /*function handleGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
    
      .then(function (result) {
        console.log(result);
        const gmail = encodeURI(result.additionalUserInfo.profile.name);
        console.log(gmail);
        fetch(`/account/login/${gmail}/${gmail}`)
        .then(response => response.text())
        .then(async (text) => {
            try {
                const data = JSON.parse(text);
                props.setStatus('');
                props.setShow(false);
                props.setUser(data);
                console.log('JSON:', data);
            } catch(err) {
              console.log(err);
                props.setStatus(text)
                console.log('err:', text);
                
                const url = `/account/create/${gmail}/${gmail}/${gmail}`;
                await fetch(url);
                const res = await fetch(`/account/login/${gmail}/${gmail}`)
                const text = await res.text();
                const data = JSON.parse(text);
                      props.setStatus('');
                      props.setShow(false);
                      props.setUser(data);
            }
        })
       
      })
      .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
      });
  }*/

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/>
    <br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)} />
      
      <br/>

    <button type="submit" className="btn btn-info" onClick={handleLogin}>Login</button>
    <br/>
    <br/>
  </>);
  
}
}