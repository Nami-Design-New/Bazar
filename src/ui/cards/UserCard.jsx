import { Link } from "react-router-dom";

function UserCard({ user, type }) {
  console.log(type, user);

  return (
    <Link to={`/profile/${user?.user?.id}`} className="user-card">
      <div className="image-wrapper">
        <img src={user?.user?.image} alt="" />
      </div>
      <div className="info">
        <h6>{user?.user?.name}</h6>
      </div>
    </Link>
  );
}

export default UserCard;
