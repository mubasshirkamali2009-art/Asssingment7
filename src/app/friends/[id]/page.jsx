import friends from "../../../friends.json";
const FriendDetailPage = ({ params }) => {
  const friend = friends.find((f) => String(f.id) === String(params.id));

  if (!friend) return <div className="p-6 text-red-500">Friend not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800">{friend.name}</h1>
      <img src={friend.picture} alt={friend.name} className="w-24 rounded-full mt-4" />
      <p className="text-gray-500 mt-2">{friend.days_since_contact} days since contact</p>
    </div>
  );
};

export default FriendDetailPage;