import { useState } from "react";

const initialFriends = [
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ];

function App() {
  //lifted up state to handle visibility of the add friend component
  const [showAddFriend, setShowAddFriend] = useState(false); 
  const handleShowAddFriend = () => {setShowAddFriend((show) => !show)};

  //lifted up state to handle communication btw adding panel and display of friends
  const [friends, setFriends] = useState(initialFriends);
  const handleAddFriends = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  };

  //lifted up state to handle communication between selected friends and bill split panel
  const [selectedFriends, setSelectedFriends] = useState(null);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends}/>
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriends} />}
        <Button onClick={handleShowAddFriend}>{ !showAddFriend ? "Add friend" : "close"}</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

export default App;

//components/////////////////////////////
const Button = ({children, onClick}) => {
      return <button className="button" onClick={onClick}>{children}</button>
};

const FriendsList = ({friends}) => {
  return (<ul>{friends.map(friend => <Friend friend={friend} key={friend.id} />)}</ul>);
};

const Friend = ({friend}) => {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)} €</p>}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {friend.balance > 0 && <p className="green">{friend.name} owes you {friend.balance} €</p>}
      <Button>Select</Button>
    </li>
  );
};

const FormAddFriend = ({onAddFriend}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");


  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !image) return;
    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name, 
      image: `${image}?=${id}`,
      balance: 0,
    };

    setName("");
    setImage("https://i.pravatar.cc/48");

    onAddFriend(newFriend);

  };

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>Friend name</label>
    <input type="text" onChange={(e) => setName(e.target.value)}/>
    <label>Image URL</label>
    <input type="text" onChange={(e) => setImage(e.target.value)} />
    <Button>Add</Button>
  </form>
};

const FormSplitBill = () => {
  return <form className="form-split-bill">
    <h2>Split a bill with X</h2>
    <label>Bill amount</label>
    <input type="text" />
    <label>your expense</label>
    <input type="text" />
    <label>X's expense</label>
    <input type="text" disabled />
    <label>Who's paying the bill</label>
    <select>
      <option value='user'>You</option>
      <option value='friend'>Friend</option>
    </select>
    <Button>Split Bill</Button>
  </form>
};
 