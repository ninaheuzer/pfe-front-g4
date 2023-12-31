import ButtonApprouve from "../Buttons/ButtonApprouve";
import ButtonRefuse from "../Buttons/ButtonRefuse";
import { useState, useEffect } from "react";
const OnePendingPost = ({ post }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    fetch(`/api/users/${post.seller_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((temp) => setUser(temp));
    });
  }, []);
  return (
    <>
      <tr className="bg-green-100">
        <td className="p-3">
          <div className="flex align-items-center">
            <div className="ml-3">
              <div className="">{post.title}</div>
            </div>
          </div>
        </td>
        <td className="p-3">{post.description}</td>
        <td className="p-3">
          <img
            alt="Image du produit"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={post.image}
          />
        </td>
        <td className="p-3">{post.category_id}</td>
        <td className="p-3">{post.places.join(", ")}</td>
        <td className="p-3">
          {user.first_name} {user.last_name}
        </td>
        <td className="p-3">{post.post_nature}</td>
        <td className="p-3">{post.price}€</td>
        <td className="p-3">
          <div className="grid grid-cols-2 gap-2">
            <ButtonApprouve postId={post._id} />
            <ButtonRefuse postId={post._id} />
          </div>
        </td>
      </tr>
    </>
  );
};

export default OnePendingPost;
