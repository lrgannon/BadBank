const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext({user: null});

const firebaseConfig = {
  apiKey: "AIzaSyBi4E5b8rsXTlVaGYtfXkALVBZj4pBjjuY",
  authDomain: "capstone1-8b481.firebaseapp.com",
  projectId: "capstone1-8b481",
  storageBucket: "capstone1-8b481.appspot.com",
  messagingSenderId: "709729662815",
  appId: "1:709729662815:web:6accf3c9c682ab83e128ea"
};

firebase.initializeApp(firebaseConfig);


function Card(props){
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "30rem" }}>
      <div className="card-header" style={{textAlign: "center"}}>{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text" style={{textAlign: "center"}}>{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
