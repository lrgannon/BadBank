function CreateAccount () {
        
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('')
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
          if(!field){
                  setStatus('Error: ' + label);
                  setTimeout(() => setStatus(''),3000);
                  return false;}
                  else if(password.length < 8){
                          setStatus('Password must be at least 8 characters');
                          setTimeout(() => setStatus(''), 3000);
                  return false;
          }
                  return true;
  }

  function handleCreate(){
          console.log(name, email, password);
          if(!validate(name, 'name')) return;
          if(!validate(email, 'email')) return;
          if(!validate(password, 'password')) return;

          const auth = firebase.auth();
          const promise = auth.createUserWithEmailAndPassword(
            email,
            password
          );
          promise.then(() => {
           const url = `/account/create/${name}/${email}/${password}`;
          (async() => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
          })();
        })
          promise.catch((e) => console.log(e.messsage));
          setShow(false);
  }

  function clearForm () {
           setName('');
           setEmail('');
           setPassword('');
           setShow(true);
  };

  return (<Card 
          txtcolor="black"
          bgcolor="light"
          header="Create a New Account"
          status={status}
          body={show ? (
                  <>
                  <br/>
                  Name
                  <br/>
                  <input 
                          type="input" 
                          className="form-control" 
                          id="name" 
                          placeholder="Enter name" 
                          value={name} 
                          onChange={e => {setName 
                                  (e.currentTarget.value)
                                  setDisabled(false);

                          }
                          } />
                  <br/>
                  Email address
                  <br/>
                  <input 
                           type="input" 
                           className="form-control" 
                           id="email" 
                           placeholder="Enter email" 
                           value={email} 
                           onChange={(e) => {setEmail 
                                  (e.currentTarget.value)
                                  setDisabled(false);
                           }
                          }
                           />
                          <br/>
                   Password
                   <br/>
                          <input 
                          type="password" 
                          className="form-control" 
                          id="password" 
                          placeholder="Enter password" 
                          value={password} 
                          onChange={(e) => { setPassword 
                          (e.currentTarget.value)
                          setDisabled(false);
                          }
                          } 
                          />
                  <br/><br/>
                  <button 
                           type='submit' 
                           className="btn btn-info" 
                           onClick={handleCreate}
                           disabled={disabled}
                   
                   >Create Account
                  </button>
                  <br/><br/>
                  </>
                  ) : (
                   <>
                          <h4>Success</h4>
                          <a href="#/login/">
                          <button 
                          type='submit' 
                          className="btn btn-info" 
                          onClick={clearForm}>Login
                          </button>
                          </a>
                          </>
          )
           }          
      />
   )
}